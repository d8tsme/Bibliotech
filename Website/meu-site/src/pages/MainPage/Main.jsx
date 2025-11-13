import '../../../src';
import Navbar from '../../components/Navbarfolder/Navbar.js';
import Table from '../../components/TabelaFolder/Tabela';
import { useState } from 'react';
import AddLivroCard from '../../components/BookFormFolder/AddLivroCard';

function Main() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: 'center', width: '100%' }}>Bem-vindo à Bibliotech</h1>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: 20 }}>
          <button className="btn primary" onClick={() => setShowAdd(true)}>Adicionar Livro</button>
        </div>
        <div id="body" style={{ display: 'flex', width: '100%' }}>
          <div id="navbar" style={{ width: '20%' }}>
            <Navbar/>
          </div>
          <div id="tabela" style={{ width: '80%' }}>
            <Table/>
          </div>
        </div>
  <AddLivroCard open={showAdd} onClose={() => setShowAdd(false)} onCreated={() => { /* could refresh table */ }} />
      </header>
    </div>
  );
}

export default Main;
