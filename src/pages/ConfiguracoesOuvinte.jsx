import "../Styles/configuracoes.css"
import React, { useEffect } from 'react';
import SidebarContent from "../components/SidebarContent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../Styles/email.png'
import img2 from '../Styles/edit.png'
import img3 from '../Styles/senha.png'
import img4 from '../Styles/suporte.png'
import { useState } from "react";
import api from "../api";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AlertDialog2 from "../components/DialogoEmail";
import AlertDialog3 from "../components/DialogoSenha";
import AlertDialog4 from "../components/DialogoExcluir";
import SidebarContentOuvinte from "../components/SidebarContentOuvinte";
function ConfiguracoesOuvinte() {
    const [isDeleted, setIsDeleted] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [openDialog3, setOpenDialog3] = useState(false);
 
    useEffect(() => {
        document.body.classList.add('home-perfil');
      
        return () => {
          document.body.classList.remove('home-perfil');
        };
      }, []);
      

    const [inputFields, setInputFields] = useState({ email: "" });

    const handleChange = (e) => {
        setInputFields({ email: e.target.value });
    };

    const dados = JSON.parse(sessionStorage.getItem('dados'));


    const [inputFields2, setInputFields2] = useState({ senha: "" });

    const handleChange2 = (e) => {
        setInputFields2({ senha: e.target.value });
    };

    const handleDeleteIconClick = (e) => {
        e.stopPropagation();
        setOpenDialog(true);
    };

    const handleDeleteIconClick2 = (e) => {
        e.stopPropagation();
        setOpenDialog2(true);
    };

    const handleDeleteIconClick3 = (e) => {
        e.stopPropagation();
        setOpenDialog3(true);
    };

    const navigate = useNavigate();

    const handleDeleteConfirmation = async (e) => {

        const usuario = {
            email: inputFields.email,
        };
        try {
            const response = await api.patch(`/usuarios/atualizar/perfil/email/${dados.id}`, usuario, {
            });

            if (response.status === 200) {
                toast.success("Email atualizado com sucesso!");
                setTimeout(() => {
                }, 2000);
            } else {
                toast.error("Erro ao realizar atualização.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro ao realizar atualização");
        }

    };
    const handleDeleteCancel = () => {
        setOpenDialog(false);
    };
    const handleDeleteCancel2 = () => {
        setOpenDialog2(false);
    };
    const handleDeleteCancel3 = () => {
        setOpenDialog3(false);
    };
    if (isDeleted) {
        return null;
    }

    const handleDeleteConfirmation2 = async (e) => {

        const usuario = {
            senha: inputFields2.senha,
        };
        try {
            const response = await api.patch(`/usuarios/atualizar/perfil/senha/${dados.id}`, usuario, {
            });

            if (response.status === 200) {
                toast.success("Senha atualizada com sucesso!");

            } else {
                toast.error("Erro ao realizar atualização.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro ao realizar atualização");
        }

    };

    const handleDeleteConfirmation3 = async (e) => {


        try {
            const response = await api.delete(`/usuarios/deletar/${dados.id}`
            );

            if (response.status === 200) {
                toast.success("Conta excluida com sucesso!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error("Erro ao realizar atualização.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro ao realizar atualização");
        }

    };



    return (
        <div className="container-config">
            <div className="componente">
                <SidebarContentOuvinte />
                <ToastContainer />
            </div>

            <div className="container-filho-config">
                <div className="navbar">
                    <p className="text-navbar">CONFIGURAÇÕES</p>
                </div>

                <div className="card-config">
                    <div className="separate">
                        <p>Ajustes de Segurança de Conta</p>
                    </div>
                    <div className="separate-b">

                        <div className="coluna">
                            <div className="imgs">
                                <img src={img} />
                            </div>

                            <div className="edit" >

                                <label className="titulo">E-mail:</label>

                                <input id="id_email" name="email" className="input-email" type="text" onChange={handleChange} />
                            </div>


                            <button type="button" onClick={handleDeleteIconClick} className="coluna-button"> Alterar </button>
                        </div>

                        <div className="coluna">
                            <div className="imgs">
                                <img src={img3} />
                            </div>

                            <div className="edit" >
                                <label className="titulo">Senha:</label>
                                <input id="id_senha" name="senha" type="password" className="input-email" onChange={handleChange2} />

                            </div>


                            <button type="button" onClick={handleDeleteIconClick2} className="coluna-button"> Alterar </button>
                        </div>

                        <div className="coluna">
                            <div className="imgs">
                                <img src={img4} />
                            </div>
                            <div className="edit">
                                <label className="titulo">Suporte</label>
                            </div>
                            <div className="imgs">
                                <img className="sac" src={img4} />
                            </div>
                            <button type="button" className="coluna-button" id="sac-sac"> SAC </button>
                        </div>

                    </div>
                    <div className="separate-c">
                        <button type="button" onClick={handleDeleteIconClick3}>Excluir conta</button>
                    </div>
                </div>
            </div>
            {openDialog && (
                <AlertDialog2
                    handleConfirmation={handleDeleteConfirmation}
                    handleCancel={handleDeleteCancel}
                    setOpenDialog={setOpenDialog}
                />
            )}

            {openDialog2 && (
                <AlertDialog3
                handleConfirmation={handleDeleteConfirmation2}
                handleCancel={handleDeleteCancel2}
                setOpenDialog={setOpenDialog2}
                />
            )}

            {openDialog3 && (
                <AlertDialog4
                handleConfirmation={handleDeleteConfirmation3}
                handleCancel={handleDeleteCancel3}
                setOpenDialog={setOpenDialog3}
              
                />
            )}
        </div>

    );
}

export default ConfiguracoesOuvinte;