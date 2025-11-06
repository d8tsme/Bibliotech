import '../../../src';
import Navbar from '../../components/Navbarfolder/navbar.js';
import Table from '../../components/TabelaFolder/Tabela';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: 'center', width: '100%' }}>Bem-vindo à Bibliotech</h1>
        <div id="body" style={{ display: 'flex', width: '100%' }}>
          <div id="navbar" style={{ width: '20%' }}>
            <Navbar/>
          </div>
          <div id="tabela" style={{ width: '80%' }}>
            <Table/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
