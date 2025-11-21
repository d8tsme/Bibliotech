import '../../../src';
import Navbar from '../../components/Navbarfolder/Navbar.js';
import Table from '../../components/TabelaFolder/Tabela';
import { useState } from 'react';
import AddLivroCard from '../../components/BookFormFolder/AddLivroCard';
import Layout from '../../components/mainlayout/layout.jsx';

function Main() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <Layout>
        <div className="App">
        <header className="App-header">
          <div>
          <h1 >Bem-vindo à Bibliotech</h1>
            <button className="btn primary" onClick={() => setShowAdd(true)}>Adicionar Livro</button>
          </div>
          <div id="body" style={{width:'100%', padding:12}}>
            <div id="tabela">
              <Table/>
            </div>
          </div>
    <AddLivroCard open={showAdd} setOpen={setShowAdd} onClose={() => setShowAdd(false)} onCreated={() => { /* could refresh table */ }} />
        </header>
      </div>
    </Layout>
    
  );
}

export default Main;
