import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import "../Styles/sidebar.css";
import myImage from '../Styles/backvibnewpng.png';
import React, { useEffect } from 'react';

import Switch from "react-switch";

function SidebarContentOuvinte() {
    const dados = JSON.parse(sessionStorage.getItem("dados"));
  const divEstilo = {
    backgroundImage: `url(${myImage})`,
  };
  const [isDarkMode, setIsDarkMode] = useState(
    sessionStorage.getItem("isDarkMode") === "true"
  );

  const handleDarkModeChange = (checked) => {
    setIsDarkMode(checked);
  };

  const handleLimparSessionStorage = () => {
    sessionStorage.clear();
  };

  useEffect(() => {
    sessionStorage.setItem("isDarkMode", isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);
    return (
        <div className="side-pai">
                <div id="sidebar" className="img" style={divEstilo}>
                    <div className="p-4">
                        <h1 className="perfil-h1"><a href="/" className="logo">Vibrato <span className="usuario">Bem vindo {dados.username}</span></a></h1>
                        <ul className="list-unstyled components mb-5">
                            
                            <li>
                                <a className="sidebar-a" href="/service"><span className="fa fa-home mr-3"></span> Home</a>
                            </li>             
                          
                            <li>
                                <a className="sidebar-a" href="/configuracoes-ouvinte"><span className="fa fa-cogs mr-3"></span>Configurações</a>
                            </li>
                            <li>
                                <a className="sidebar-a" href="/explore"><span className="fa fa-search mr-3"></span>Explore</a>
                            </li>
                            <li>
                                <a onClick={handleLimparSessionStorage} className="sidebar-a" href="/login"><span className="fa fa-close mr-3"></span>Sair</a>
                            </li>
                           
                        </ul>
                        <div className="dark-mode-toggle">
            <span className="toggle-label">Dark Mode</span>
            <Switch
              checked={isDarkMode}
              onChange={handleDarkModeChange}
              onColor="#3f51b5"
              offColor="#ccc"
              checkedIcon={false}
              uncheckedIcon={false}
              height={20}
              width={40}
            />
          </div>
                       
                    </div>
                </div>
                {isDarkMode && <div className="dark-overlay"></div>}

            </div>
            
 

    );
}

export default SidebarContentOuvinte;

