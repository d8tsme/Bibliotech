import React, { useState } from 'react';
import apiFetch from '../../utils/apiFetch';
import '../BookFormFolder/AddLivroCard.css';
import ModalForm from '../modalform/modalform';

export default function AddGeneroCard({ open, setOpen, onClose, onCreated }) {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const reset = () => { setNome(''); setError(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const payload = { nome };
      const res = await apiFetch('/generos/inserir', { method: 'POST', body: JSON.stringify(payload) });
      reset();
      onCreated && onCreated(res);
      onClose && onClose();
    } catch (err) {
      setError(err.message || 'Erro ao criar gênero');
    } finally { setLoading(false); }
  };

  return (
    <ModalForm open={open} setOpen={setOpen} handleSubmit={handleSubmit} header="Adicionar Gênero">
      {error && <div className="error">{error}</div>}
                <label>Nome<input value={nome} onChange={e=>setNome(e.target.value)} required /></label>
                <div className="addlivro-actions">
                  <button type="button" className="btn secondary" onClick={() => { reset(); onClose && onClose(); }}>Cancelar</button>
                  <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Enviando...' : 'Adicionar'}</button>
                </div>
    </ModalForm>
  );
}
