import { Route, Navigate } from "react-router-dom";

const AuthRoute = ({ type, allowedTypes, ...props }) => {
  const isAuthenticated = sessionStorage.getItem('dados') !== null;
  const tipoUsuario = isAuthenticated ? JSON.parse(sessionStorage.getItem('dados')).tipoUsuario : '';

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedTypes.includes(tipoUsuario)) {
    return <Navigate to="/login" />;
  }

  return <Route {...props} />;
};

export default AuthRoute;