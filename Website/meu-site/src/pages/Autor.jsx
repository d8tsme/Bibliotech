import './App.css';
import Navbar from '../components/Navbarfolder/Navbar';

function App() {
  async function getAutor() {
    fetch('http://localhost:8080/autores/listar',
      {
        method: 'GET',
        headers: {
           "Authorization": "Bearer " + sessionStorage.getItem("jwt-token")
        }
     }).then(response => response.json())
       .then(data => console.log(data))
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bem-vindo à Bibliotech</h1>


        <Navbar/>
      </header>
    </div>
  );
}

export default App;
