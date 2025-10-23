import './App.css';
import Navbar from '../../components/Navbarfolder/Navbar';
import CardView from '../../components/ListView/CardView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <CardView/>
      </header>
    </div>
  );
}

export default App;
