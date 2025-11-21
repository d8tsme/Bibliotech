import React, { useEffect } from 'react';
import '../LoginPage/App.css';
import Navbar from '../../components/Navbarfolder/Navbar.js';
import Tabela from '../../components/TabelaFolder/Tabela';
import AddAutorCard from '../../components/EntityForms/AddAutorCard';
import Layout from '../../components/mainlayout/layout.jsx';
import { useState } from 'react';

function Autor() {
  const [showAdd, setShowAdd] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  async function getAutor() {
    try {
      const json = await (await import('../../utils/apiFetch')).default('/autores/listar');
      console.log(json);
    } catch (err) {
      console.error('Erro ao buscar autores:', err);
      if (err.status === 401 || err.status === 403) {
        window.location.href = '/login';
      }
    }
  }
  useEffect(() => {
    getAutor();
  }, []);
  return (
    <Layout>
        <div className="App">
        <header className="App-header">
          <h1>Autores</h1>
          <div style={{width:'100%', padding:12}}>
            <button onClick={()=>setShowAdd(true)} className="btn primary">Adicionar Autor</button>
          </div>
          <Tabela titulo="Autores" apiPath="/autores/listar" key={reloadKey} columns={[{key:'foto',label:'Foto'},{key:'nome',label:'Nome'}]} />
          <AddAutorCard open={showAdd} onClose={()=>setShowAdd(false)} onCreated={()=>setReloadKey(k=>k+1)} />
        </header>
      </div>
    </Layout>
  );
}

export default Autor;
