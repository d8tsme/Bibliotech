import React from 'react';
import '../LoginPage/App.css';
import Navbar from '../../components/Navbarfolder/Navbar.js';
import Layout from '../../components/mainlayout/layout.jsx';
import './Bibliotech.css';

export default function Bibliotech() {
  return (
    <div className="layout">
      <Navbar/>
      <div className="main-content">
        <div className="bibliotech-container">
          <div className="bibliotech-logo">
            Biblio.<br/>tech
          </div>
          
          <div className="bibliotech-intro">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          <div className="bibliotech-buttons">
            <a href="https://github.com/d8tsme/ProjetoCC" target="_blank" rel="noopener noreferrer" className="bibliotech-btn">
              Repositório Git
            </a>
            <a href="https://app.flutterflow.io/project/projeto-final-8p0rcf" target="_blank" rel="noopener noreferrer" className="bibliotech-btn">
              Flutter Flow
            </a>
            <a href="#" className="bibliotech-btn">
              Documentação
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
