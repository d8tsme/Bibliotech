import '../LoginPage/App.css';
import Navbar from '../../components/Navbarfolder/Navbar.js';
import Tabela from '../../components/TabelaFolder/Tabela';
import AddPessoaCard from '../../components/EntityForms/AddPessoaCard';
import PessoaTable from '../../components/EntityTables/PessoaTable';
import { useState } from 'react';
import Layout from '../../components/mainlayout/layout.jsx';

export default function Pessoas() {
  const [showAdd, setShowAdd] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  
  const triggerReload = () => setReloadKey(k => k + 1);
  
  return (
    <div className="layout">
      <Navbar/>
      <div className="main-content">
        <div className="page-header">
          <h1>Pessoas</h1>
          <div className="add-btn-bar">
            <button onClick={()=>setShowAdd(true)} className="btn primary">Adicionar Pessoa</button>
          </div>
        </div>
        <PessoaTable reloadKey={reloadKey} />
        <AddPessoaCard open={showAdd} onClose={()=>setShowAdd(false)} onCreated={triggerReload} />
      </div>
    </div>
  );
}
