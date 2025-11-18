import React, { useState } from 'react';
import apiFetch from '../../utils/apiFetch';
import '../BookFormFolder/AddLivroCard.css';

export default function AddGeneroCard({ open, onClose, onCreated }) {
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
    <div className="addlivro-overlay">
      <div className="addlivro-card">
        <header className="addlivro-header">
          <h2>Adicionar Gênero</h2>
          <button className="close-btn" onClick={onClose} aria-label="Fechar">×</button>
        </header>
        <form className="addlivro-form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <label>Nome<input value={nome} onChange={e=>setNome(e.target.value)} required /></label>
          <div className="addlivro-actions">
            <button type="button" className="btn secondary" onClick={() => { reset(); onClose && onClose(); }}>Cancelar</button>
            <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Enviando...' : 'Adicionar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
