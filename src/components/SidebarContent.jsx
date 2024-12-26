import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import "../Styles/sidebar.css";
import myImage from "../Styles/backvibnewpng.png";
import "../Styles/dashboard.css";

function SidebarContent() {
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
          <h1 className="perfil-h1">
            <a href="/" className="logo">
              Vibrato <span className="usuario">Bem vindo {dados.username}</span>
            </a>
          </h1>
          <ul className="list-unstyled components mb-5">
            <li>
              <a className="sidebar-a" href="/home">
                <span className="fa fa-home mr-3"></span> Home
              </a>
            </li>
            <li>
              <a className="sidebar-a" href="perfil">
                <span className="fa fa-user mr-3"></span> Perfil
              </a>
            </li>
            <li>
              <a className="sidebar-a" href="/echo">
                <span className="fa fa-sticky-note mr-3"></span> ECHO System
              </a>
            </li>
            <li>
              <a className="sidebar-a" href="/dashboard">
                <span className="fa fa-dashboard mr-3"></span> Análise
              </a>
            </li>
            <li>
              <a className="sidebar-a" href="configuracoes">
                <span className="fa fa-cogs mr-3"></span>Configurações
              </a>
            </li>
            <li>
              <a className="sidebar-a" href="/explore">
                <span className="fa fa-search mr-3"></span>Explore
              </a>
            </li>
            <li>
              <a
                onClick={handleLimparSessionStorage}
                className="sidebar-a"
                href="/login"
              >
                <span className="fa fa-close mr-3"></span>Sair
              </a>
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

export default SidebarContent;
