import './App.css';
import Navbar from '../components/Navbarfolder/Navbar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/autor" element={<Autor />} />
      </Routes>
      </BrowserRouter>
      <header className="App-header">
        <h1>Bem-vindo à Bibliotech</h1>   
        <Navbar/>
      </header>
    </div>
  );
}

export default App;
