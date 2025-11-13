import React, { useEffect } from 'react';
import '../LoginPage/App.css';
import Navbar from '../../components/Navbarfolder/Navbar.js';

function Autor() {
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
    <div className="App">
      <header className="App-header">
        <h1>Bem-vindo à Bibliotech</h1>
        <Navbar/>
      </header>
    </div>
  );
}

export default Autor;
