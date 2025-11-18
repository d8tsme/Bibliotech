import '../LoginPage/App.css';
import Navbar from '../../components/Navbarfolder/Navbar.js';
import Tabela from '../../components/TabelaFolder/Tabela';
import AddGeneroCard from '../../components/EntityForms/AddGeneroCard';
import { useState } from 'react';

export default function Generos() {
  const [showAdd, setShowAdd] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Generos</h1>
        <Navbar />
        <div style={{width:'100%', padding:12}}>
          <button onClick={()=>setShowAdd(true)} className="btn primary">Adicionar Gênero</button>
        </div>
        <Tabela titulo="Gêneros" apiPath="/generos/listar" key={reloadKey} columns={[{key:'id',label:'ID'},{key:'nome',label:'Nome'}]} />
        <AddGeneroCard open={showAdd} onClose={()=>setShowAdd(false)} onCreated={()=>setReloadKey(k=>k+1)} />
      </header>
    </div>
  );
}