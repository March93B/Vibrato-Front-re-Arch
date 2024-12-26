import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from 'react';
import api from "../api";
import BasicTable from "../components/Tabela";
import React from 'react';
import SidebarContent from "../components/SidebarContent";
import '../Styles/dashboard.css';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import MusicBoxPerfil from "../components/MusicBoxPerfil";
import Meguel from "../components/Meguel";
function Dashboard(props) {
  const dados = JSON.parse(sessionStorage.getItem('dados'));
  const [streams, setStreams] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = sessionStorage.getItem("isDarkMode");
    if (storedDarkMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.getElementById("random-text").classList.add("dark-text");
    } else {
      document.getElementById("random-text").classList.remove("dark-text");
    }
  }, [isDarkMode]);

  const handleDarkModeChange = (checked) => {
    setIsDarkMode(checked);
    sessionStorage.setItem("isDarkMode", checked ? "true" : "false");
  };

  useEffect(() => {
    document.body.classList.add('echo-perfil');

    return () => {
      document.body.classList.remove('echo-perfil');
    };
  }, []);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await api.get(`/echo/visu100/${dados.id}`);
        setStreams(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStreams();
  }, [dados.id]);

  const data = streams.map((stream) => ({
    none: stream.tituloMusica || '',
    visualizacao: stream.visualizacao || 0,
    plays: stream.streams || 0,
    redirecionamentos: stream.redirecionamento || 0,
    compartilhamentos: stream.curtidas || 0,
  }));

  const dataAtual = new Date();
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const mes = meses[dataAtual.getMonth()];
  const ano = dataAtual.getFullYear();
  const exportCsv = () => {
    api.get(`/echo/visu-csv/${dados.id}`, { responseType: 'arraybuffer' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'metricas.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("Este endpoint não existe");
        } else {
          console.error(err);
        }
      });
  };

  const exportTxt = () => {
    api.get(`/echo/gerarArquivoTxt/${dados.id}`, { responseType: 'arraybuffer' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'text/txt' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'arquivo.txt');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("Este endpoint não existe");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <body className="echo-perfil" />
      </Helmet>
      <div className="pai-echo">
        <SidebarContent />

        <div className="direita-echo-dash">
          <div className="navbar-echo">
            <p className="text-navbar-echo">DASHBOARD </p>
            <Meguel />
          </div>
          <div className="dash-text">
            <p id="random-text" className={`texto-dashboard ${isDarkMode ? 'dark-text' : 'dark-text'}`}>
              {mes} de {ano} (mês de reflexão)
            </p>
          </div>
          <div className="auto-tabela">
            <div className="content-div-esquerda-filho-dashboard">
              <BasicTable data={data} />
            </div>
            <div className="faixa-botao-exports">
              <button onClick={exportTxt} className="btn-faixa">Exportar .txt</button>
              <button onClick={exportCsv} className="btn-faixa">Exportar Csv</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
