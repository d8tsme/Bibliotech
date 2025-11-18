import '../LoginPage/App.css';
import Navbar from '../../components/Navbarfolder/Navbar.js';
import Tabela from '../../components/TabelaFolder/Tabela';
import AddEmprestimoCard from '../../components/EntityForms/AddEmprestimoCard';
import { useState } from 'react';

export default function Emprestimo() {
  const [showAdd, setShowAdd] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Empréstimos</h1>
        <Navbar />
        <div style={{width:'100%', padding:12}}>
          <button onClick={()=>setShowAdd(true)} className="btn primary">Adicionar Empréstimo</button>
        </div>
        <Tabela titulo="Empréstimos" apiPath="/emprestimos/listar" key={reloadKey} columns={[{key:'livro_foto',label:'Foto'},{key:'livro_titulo',label:'Livro'},{key:'pessoa_nome',label:'Pessoa'},{key:'dataEmprestimo',label:'Data Empréstimo'},{key:'dataDevolucao',label:'Data Devolução'},{key:'status',label:'Status'}]} />
        <AddEmprestimoCard open={showAdd} onClose={()=>setShowAdd(false)} onCreated={()=>setReloadKey(k=>k+1)} />
      </header>
    </div>
  );
}
