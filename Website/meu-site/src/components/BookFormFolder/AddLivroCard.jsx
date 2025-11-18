import React, { useEffect, useState } from 'react';
import apiFetch from '../../utils/apiFetch';
import './AddLivroCard.css';

export default function AddLivroCard({ open, onClose, onCreated }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [paginas, setPaginas] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [isbn, setIsbn] = useState('');
  const [foto, setFoto] = useState(null);

  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    async function load() {
      try {
        const a = await apiFetch('/autores/listar');
        const g = await apiFetch('/generos/listar');
        if (!cancelled) {
          setAutores(Array.isArray(a) ? a : []);
          setGeneros(Array.isArray(g) ? g : []);
        }
      } catch (err) {
        console.error('Erro ao carregar autores/gêneros', err);
        setError('Não foi possível carregar autores ou gêneros.');
      }
    }
    load();
    return () => { cancelled = true; };
  }, [open]);

  if (!open) return null;

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    setFoto(f || null);
  };

  const reset = () => {
    setTitulo(''); setAutor(''); setGenero(''); setPaginas(''); setAnoPublicacao(''); setIsbn(''); setFoto(null); setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('titulo', titulo);
      // send autor and genero as ids when available, otherwise as string
      form.append('autorId', autor);
      form.append('generoId', genero);
      form.append('paginas', paginas);
      form.append('anoPublicacao', anoPublicacao);
      form.append('isbn', isbn);
      if (foto) form.append('foto', foto);

      const res = await apiFetch('/livros/inserir', { method: 'POST', body: form });
      // assume success returns created object or success message
      reset();
      onCreated && onCreated(res);
      onClose && onClose();
    } catch (err) {
      console.error('Erro ao inserir livro', err);
      setError(err.message || 'Erro ao enviar formulário');
    } finally {
      setLoading(false);
    }
  };

  const pickId = (item) => {
    // try common id fields then fallback to nome
    return item && (item.id ?? item.codigo ?? item._id ?? item.nome);
  };

  return (
    <div className="addlivro-overlay">
      <div className="addlivro-card">
        <header className="addlivro-header">
          <h2>Adicionar Livro</h2>
          <button className="close-btn" onClick={onClose} aria-label="Fechar">×</button>
        </header>

        <form className="addlivro-form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <label>Título
            <input value={titulo} onChange={e=>setTitulo(e.target.value)} required />
          </label>

          <label>Autor
            <select value={autor} onChange={e=>setAutor(e.target.value)} required>
              <option value="">-- selecione --</option>
              {autores.map(a => (
                <option key={pickId(a)} value={pickId(a)}>{a.nome || a.nomeAutor || a.nomeCompleto || String(pickId(a))}</option>
              ))}
            </select>
          </label>

          <label>Foto
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          <label>Gênero
            <select value={genero} onChange={e=>setGenero(e.target.value)} required>
              <option value="">-- selecione --</option>
              {generos.map(g => (
                <option key={pickId(g)} value={pickId(g)}>{g.nome || g.titulo || String(pickId(g))}</option>
              ))}
            </select>
          </label>

          <label>Páginas
            <input type="number" min="1" value={paginas} onChange={e=>setPaginas(e.target.value)} />
          </label>

          <label>Ano de Publicação
            <input type="number" min="0" value={anoPublicacao} onChange={e=>setAnoPublicacao(e.target.value)} />
          </label>

          <label>ISBN
            <input value={isbn} onChange={e=>setIsbn(e.target.value)} />
          </label>

          <div className="addlivro-actions">
            <button type="button" className="btn secondary" onClick={() => { reset(); onClose && onClose(); }}>Cancelar</button>
            <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Enviando...' : 'Adicionar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
