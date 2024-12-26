import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import Navbar from "../components/Navbar";
import "../Styles/login.css";
import FooterCL from "../components/FooterCL";
import React, { useEffect } from 'react';
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


function Negado(props) {

  const [inputFields, setInputFields] = useState([
    { senhaa: '', emaill: '' }
  ])
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }
  useEffect(() => {
    document.body.classList.add('login');
  }, []);
  const navigate = useNavigate();

  function checkPermissions(tipoUsuario, allowedTypes) {
    return allowedTypes.includes(tipoUsuario);
  }


function clique() {
  navigate('/');

}



  return (
    <div>

      <Navbar />

      <h1 className="Login">Opss... Parece que você se perdeu</h1>

      <form>
        {inputFields.map((input, index) => {
          return (
            <div className="inputs" key={index}>
              <div className="pai-login">
                  <p className="login-user">Clique aqui para voltar para a home
                   <button className="btncad-login" onClick={clique}>Voltar</button>
                  </p>
                  <div className="invisss">

                  <div>
                    <p className="login-senha">Senha
                      <input hidden type="password" name="senha-login" id="senhaa" onChange={event => handleFormChange(index, event)} />
                      <a  hidden className="deco-login" href="/cadastro"><p className="other-link2">Registre-se agora</p></a>

                    </p>
                  </div>
                <div className="coisa-coisada-c"></div>
                </div>
              </div>
            </div>
          )
        })}
                          <div className="invisss">

        <button className="btncad-login" hidden >Entrar</button>
        </div>

      </form>
      <FooterCL />

    </div>

  );
}
export default Negado;

