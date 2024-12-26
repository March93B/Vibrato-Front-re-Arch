import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Echo from "./pages/Echo";
import EchoLink from "./pages/EchoLink";
import TestAPI from "./pages/TestAPI";
import Inicio from "./pages/Inicio";
import PerfilArtista from "./pages/PerfilArtista";
import PerfilLink from "./pages/PerfilLink";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import HomeOuvinte from "./pages/Home";
import Configuracoes from "./pages/Configuracoes";
import ConfiguracoesOuvinte from "./pages/ConfiguracoesOuvinte";
import Negado from "./pages/Negado";
function PrivateRoute({ path, element: Component, allowedTypes }) {
  const isAuthenticated = sessionStorage.getItem('dados') !== null;
  const tipoUsuario = isAuthenticated ? JSON.parse(sessionStorage.getItem('dados')).tipoUsuario : '';

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedTypes.includes(tipoUsuario)) {
    return <Navigate to="/acesso-negado" />;
  }

  return <Component />;
}

function App() {
  return (
    <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<PrivateRoute element={Perfil} allowedTypes={['Artista']} />} />
      <Route path="/perfil" element={<PrivateRoute element={PerfilArtista} allowedTypes={['Artista']} />} />
      <Route path="/echo" element={<PrivateRoute element={Echo} allowedTypes={['Artista']} />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} allowedTypes={['Artista']} />} />
      <Route path="/artists/:username" element={<PerfilLink />} />
      <Route path="/echolink/:id" element={<EchoLink />} />
      <Route path="/explore"element={<PrivateRoute element={Explore} allowedTypes={['Ouvinte','Artista']} />} />
      <Route path="/service" element={<PrivateRoute element={HomeOuvinte} allowedTypes={['Ouvinte']} />} />
      <Route path="/teste" element={<PrivateRoute element={TestAPI} allowedTypes={['Artista', 'Ouvinte']} />} />
      <Route path="/configuracoes" element={<PrivateRoute element={Configuracoes} allowedTypes={['Artista']} />} />
      <Route path="/configuracoes-ouvinte" element={<PrivateRoute element={ConfiguracoesOuvinte} allowedTypes={['Ouvinte']} />} />
      <Route path="/acesso-negado" element={<PrivateRoute element={Negado} allowedTypes={['Artista', 'Ouvinte']} />} />

    </Routes>
  );
}

export default App;
