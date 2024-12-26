import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedTypes, element: Component, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('dados') !== null;
  const tipoUsuario = isAuthenticated ? JSON.parse(sessionStorage.getItem('dados')).tipoUsuario : '';

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedTypes.includes(tipoUsuario)) {
    return <Navigate to="/acesso-negado" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;