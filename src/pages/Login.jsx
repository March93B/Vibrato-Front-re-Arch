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


function Home(props) {

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


      const submit = (e) => {
        e.preventDefault();
        toast.success("Autenticando...");

        api.post('usuarios/login', {
          email: emaill.value,
          senha: senhaa.value
        })
          .then(response => {
            sessionStorage.setItem('dados', JSON.stringify(response.data));
            const tipoUsuario = response.data.tipoUsuario;
            if (checkPermissions(tipoUsuario, ['Artista'])) {
              navigate('/home');
            } else if (checkPermissions(tipoUsuario, ['Ouvinte'])) {
              navigate('/service');
            } else {
              toast.error('Tipo de usuário inválido.');
              console.log(response);
            }
            toast.success('Login bem sucedido!');
          })
          .catch(error => {
            console.error(error);
            toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
          });
      };




    return (
        <div>

            <Navbar />
            <ToastContainer />

            <h1 className="Login">Iniciar Sessão</h1>

            <form>
                {inputFields.map((input, index) => {
                    return (
                        <div className="inputs" key={index}>
                            <div className="pai-login">
                                <p className="login-user">E-mail
                                    <input type="text" name="emaill" id="emaill" onChange={event => handleFormChange(index, event)} />
                                </p>
                                <p className="login-senha">Senha
                                    <input type="password" name="senha-login" id="senhaa" onChange={event => handleFormChange(index, event)} />
                                    <a className="deco-login" href="/cadastro"><p className="other-link2">Registre-se agora</p></a>

                                </p>
                            </div>
                        </div>
                    )
                })}
                <button className="btncad-login" onClick={submit}>Entrar</button>
            </form>
            <FooterCL />

        </div>

    );
}
export default Home;

