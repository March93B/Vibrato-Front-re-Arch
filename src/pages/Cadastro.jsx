import { useRef } from "react";
import "../Styles/cadastro.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import Navbar from "../components/Navbar";
import FooterCL from "../components/FooterCL";
import Dropdown from "../components/Dropdown";
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function validar() {
    if (nome.value == "" || username.value == "" || email.value == "" || senha.value == "" || senha2.value == "") {
        toast.error("Preencha todos os campos para prosseguir");
        return false;
    } else if (nome.value.length < 5) {
        toast.error("Nome inválido");
        return false;
    } else if (email.value.indexOf("@") == -1 || email.value.indexOf(".com") == -1 || email.value.indexOf("@") > email.value.indexOf(".com")) {
        toast.error("E-mail inválido! Verifique e tente novamente.");
        return false;
    } else if (senha.value.length < 8) {
        toast.error("A senha deve conter no mínimo 8 caracteres!");
        return false;
    } else if (senha.value != senha2.value) {
        toast.error("As senhas devem ser iguais");
        return false;
    } else {
        return true;

    }
}
function Home(props) {
    const [inputFields, setInputFields] = useState([
        { name: '', senha: '', email: '', username: '' }
    ])



    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);

    }


    useEffect(() => {
        document.body.classList.add('cadastro');
    }, []);

    const options = [
        { label: "Ouvinte", value: "1" },
        { label: "Artista", value: "2" },
        { label: "Produtora", value: "3" },
    ];

    const [selectedValue, setSelectedValue] = useState(options[0].value);
    const navigate = useNavigate();

    const handleOptionSelect = (value) => {
        setSelectedValue(value);
    };

    const formRef = useRef();

    const submit = (e) => {
        event.preventDefault();

        if (selectedValue == 1) {
            if (validar() != false) {
                e.preventDefault();

                fetch("http://localhost:8080/usuarios/ouvinte",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                            nome: nome.value,
                            senha: senha.value,
                            email: email.value,
                            username: username.value
                        })
                    })
                    .then(function (res) {
                        if (res.ok) {
                            toast.success("Cadastro realizado com sucesso!");
                            formRef.current.reset()
                            setTimeout(() => {
                                navigate("/login");

                            }, 2000);

                        } else {
                            toast.error("Erro ao realizar cadastro.");
                       
                        }
                    })

                }

            }
        if (selectedValue == 2) {
            if (validar() != false) {

                e.preventDefault();
                fetch("http://localhost:8080/usuarios/artista",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                            nome: nome.value,
                            senha: senha.value,
                            email: email.value,
                            username: username.value
                        })
                    })
                    .then(function (res) {
                        if (res.status === 409) {
                            toast.error("Usuário ou email já existem.");
                        } else if (res.ok) {
                            toast.success("Cadastro realizado com sucesso!");
                            formRef.current.reset();
                            setTimeout(() => {
                                navigate("/login");
                            }, 2000);
                        } else {
                            toast.error("Erro ao realizar cadastro.");
                        }
                    })

                }

            }
    }


    return (
        <div>
            <Navbar />
            <ToastContainer />

            <h1 className="cadastron">Registrar com o e-mail</h1>

            <form ref={formRef}>
                {inputFields.map((input, index) => {
                    return (
                        <div className="inputs" key={index}>
                            <div className="row-pai">
                                <p className="row1">Nome Completo
                                    <input type="text" name="nome" id="nome" onChange={event => handleFormChange(index, event)} />
                                </p>
                                <p className="row2">Username
                                    <input type="text" name="username" id="username" onChange={event => handleFormChange(index, event)} />
                                </p>
                                <p className="row3">Email
                                    <input type="text" name="nosei" id="email" onChange={event => handleFormChange(index, event)} />
                                </p>
                            </div>
                            <div className="row-pai2">
                                <p className="row4">Senha
                                    <input type="password" name="senha" id="senha" onChange={event => handleFormChange(index, event)} />
                                </p>

                                <p className="row5">Confirmar Senha
                                    <input type="password" name="email" id="senha2" onChange={event => handleFormChange(index, event)} />


                                </p>

                            </div>
                            <div>
                                <p className="other-link">Selecione o tipo de usuário

                                </p>
                                <Dropdown options={options} onSelect={handleOptionSelect} />

                            </div>
                        </div>
                    )
                })}
                <button className="btncad" onClick={submit}>Cadastrar</button>
            </form>

            <FooterCL />

        </div>

    );
}

export default Home;

