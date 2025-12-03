import React, { useState, useEffect } from 'react';
import apiFetch from '../../utils/apiFetch';
import handleAuthError from '../../utils/authError';
import saveCsv from '../../utils/csv';

export default function ReservasAntigasTable({ reloadKey }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('dataValidade');
  const cols = [
    { key: 'livro_foto', label: 'Foto' },
    { key: 'livro_titulo', label: 'Livro' },
    { key: 'pessoa_nome', label: 'Pessoa' },
    { key: 'dataReserva', label: 'Data Reserva' },
    { key: 'dataValidade', label: 'Data Validade' },
    { key: 'confirmarPosse', label: 'Status' },
  ];

  // avoid exhaustive-deps warning: loader intentionally recreated
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [search, sort, reloadKey]);

  async function load() {
    try {
      const res = await apiFetch('/reservas/listar');
      let arr = Array.isArray(res) ? res : (res && res.content ? res.content : []);
      // Mostrar apenas reservas confirmadas (confirmarPosse === true)
      arr = arr.filter(r => r.confirmarPosse === true);
      if (search) arr = arr.filter(r => (r.pessoa_nome && r.pessoa_nome.toLowerCase().includes(search.toLowerCase())) || (r.livro_titulo && r.livro_titulo.toLowerCase().includes(search.toLowerCase())));
      
      // Sort
      if (sort === 'dataValidade') arr.sort((a, b) => new Date(a.dataValidade) - new Date(b.dataValidade));
      else if (sort === 'pessoa') arr.sort((a, b) => (a.pessoa_nome || '').localeCompare(b.pessoa_nome || ''));
      else if (sort === 'livro') arr.sort((a, b) => (a.livro_titulo || '').localeCompare(b.livro_titulo || ''));
      
      setData(arr);
    } catch (err) {
      console.error('Erro ao carregar reservas antigas', err);
      if (err && (err.status === 401 || err.status === 403)) {
        handleAuthError();
        return;
      }
      setData([]);
    }
  }

  return (
    <div>
      <h3>Reservas Antigas (Confirmadas)</h3>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <input placeholder="Buscar" value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn" onClick={() => saveCsv('reservas_antigas.csv', data, cols)}>Salvar CSV</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c.key} onClick={() => c.key !== 'livro_foto' && setSort(c.key)} style={{cursor: c.key !== 'livro_foto' ? 'pointer' : 'default'}}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.id}>
              <td>{r.livro_foto ? <img src={r.livro_foto} alt="Capa" style={{maxWidth:40,maxHeight:60}} /> : 'sem imagem'}</td>
              <td>{r.livro_titulo}</td>
              <td>{r.pessoa_nome}</td>
              <td>{r.dataReserva}</td>
              <td>{r.dataValidade}</td>
              <td><span style={{color: 'green', fontWeight: 'bold'}}>✓ Confirmada</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
