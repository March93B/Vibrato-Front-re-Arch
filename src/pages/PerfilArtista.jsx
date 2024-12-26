import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import api from "../api";
import React, { useEffect } from 'react';
import SidebarContent from "../components/SidebarContent";
import personalizar from '../Styles/personalizar.css';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MusicBoxPerfil from "../components/MusicBoxPerfil";
import Meguel from "../components/Meguel";
function PerfilArtista(props) {
    const navigate = useNavigate();


    useEffect(() => {
        document.body.classList.add('echo-perfil');

        return () => {
            document.body.classList.remove('echo-perfil');
        };
    }, []);


    const [inputFields, setInputFields] = useState([
        {
            spotify: '', soundCloud: '', twitter: '', instagram: '', username: '', genero: ''
        }
    ]);

    // const [valor, setValor] = useState('');

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const currentData = JSON.parse(sessionStorage.getItem('dados'));


    const handleChange = (event) => {
        setText(event.target.value);
    };

    const [text, setText] = useState('');
    const [imagem, setImagem] = useState(null);
    const [imagemExist, setImagemExist] = useState(null);
    const [infos, setInfos] = useState(null);
    const [perfil, setPerfil] = useState(null);

    const handleImagemChange = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setImagem(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const dados = JSON.parse(sessionStorage.getItem('dados'));

    useEffect(() => {
        const fetchLyrics = async () => {
            try {
                const response = await api.get(`/usuarios/perfil/${dados.id}`);

                setImagemExist(response.data.blob)
                setInfos(response.data)
            } catch (err) {
                console.error(err);
            }
        };

        fetchLyrics();
    }, [dados.id]);


    useEffect(() => {
        const fetchLyrics = async () => {
            try {
                const response = await api.get(`/echo/artista/${dados.id}`);
                setPerfil(response.data)

            } catch (err) {
                console.error(err);

            }
        };

        fetchLyrics();
    }, [dados.id]);




    
    const api = axios.create({
        baseURL: 'http://localhost:8080'
    });

    const submit = async (e) => {
        e.preventDefault();

        const textWithBreaks = text.replace(/\n\r?/g, '<br />');

        const imageFile = document.getElementById("imagem").files[0];

        const usuario = {
            idUsuario: dados.id,
            spotify: inputFields[0].spotify,
            soundcloud: inputFields[0].soundCloud,
            twitter: inputFields[0].twitter,
            username: inputFields[0].username,
            instagram: inputFields[0].instagram,
            genero: inputFields[0].genero,
            biografia: textWithBreaks
        };

        const formData = new FormData();
        formData.append("imagem", imageFile);
        formData.append("usuario", JSON.stringify(usuario));

        try {
            const response = await api.patch("/usuarios", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 409) {
                toast.error("Username em uso!");
            }
            else if (response.status === 201) {
                toast.success("Perfil atualizado com sucesso!");
                setTimeout(() => {
                    const updateSessionStorageValue = (key, field, updatedValue) => {
                        const currentValue = JSON.parse(sessionStorage.getItem(key));

                        if (currentValue && typeof currentValue === 'object') {
                            currentValue[field] = updatedValue;

                            sessionStorage.setItem(key, JSON.stringify(currentValue));
                        }
                    };
                    updateSessionStorageValue('dados', 'username', inputFields[0].username);

                    navigate("/home");
                }, 2000);
            } else {
                toast.error("Erro ao realizar atualização.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Username em uso");
        }

    };
    const url = "http://localhost:8080/echo/"
    return (
        <React.Fragment>
            <Helmet>
                <body className="echo-perfil" />
            </Helmet>
            <div className="pai-echo">
                <SidebarContent />
                <ToastContainer />

                <div className="direita-echo">
                    
                    <div className="navbar-echo">
                        
                        <p className="text-navbar-echo">PERFIL - PERSONALIZAR </p>
                        <Meguel/>
                    </div>
                    <div className="esquerda-filho-echo">
                        <div className="content-div-esquerda">
                            <div className="content-div-esquerda-filho">
                                <div className="circulo-echo">
                                    {imagemExist && !imagem && (
                                        <img
                                            src={`${url}${imagemExist}`}
                                            alt="Imagem existente"
                                            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '30px' }}
                                        />
                                    )}

                                    {imagem && (
                                        <img
                                            src={imagem}
                                            alt="Imagem selecionada"
                                            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '30px' }}
                                        />
                                    )}

                                </div>

                                <label htmlFor="imagem" className="custom-file-upload" >
                                    Alterar foto de perfil
                                </label>
                                <input type="file" name="imagem" id="imagem" className="hidden" onChange={handleImagemChange} />
                            </div>

                            <div className="content-div-esquerda-filho2">
                                <div className="titulo1-echo-esquerda"> Coleção de Músicas </div>
                                <div className="inputs-echo-esquerda333">
                                    {perfil ? (
                                        perfil.map((echo) => (
                                            <MusicBoxPerfil
                                                key={echo.id}
                                                id={echo.idEcho}
                                                blob={echo.blob}
                                            />
                                        ))
                                    ) : (
                                        <p>Carregando...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="direita-filho-echo">
                        <div className="content-div-direita">
                            <div className="content-div-direita-filho">
                                <div className="titulo1-echo"> Informações do Usuário</div>
                                {inputFields.map((input, index) => {
                                    return (
                                        <div className="inputs-echo-direita" key={index}>
                                            <p className="p-direita-echo">Nome de usuário
                                                <input type="text" className="input-echo-d" placeholder={`${dados.username}`} name="username" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                            <div className="particao-perfil">
                                                <div className="particao-e">

                                                    <p className="p-direita-echo">Twitter
                                                        <input type="text" className="input-echo-n" name="twitter" onChange={event => handleFormChange(index, event)} />
                                                    </p>
                                                    <p className="p-direita-echo">Instagram
                                                        <input type="text" className="input-echo-n" name="instagram" onChange={event => handleFormChange(index, event)} />
                                                    </p>
                                                </div>

                                                <div className="particao-d  ">
                                                    <p className="p-direita-echo">Spotify
                                                        <input type="text" className="input-echo-n" name="spotify" onChange={event => handleFormChange(index, event)} />
                                                    </p>
                                                    <p className="p-direita-echo">SoundCloud
                                                        <input type="text" className="input-echo-n" name="soundCloud" onChange={event => handleFormChange(index, event)} />
                                                    </p>
                                                </div>

                                            </div>


                                            <p className="p-direita-echo">Gênero músical *
                                                <input type="text" className="input-echo-d" name="genero" onChange={event => handleFormChange(index, event)} />
                                            </p>

                                        </div>
                                    );
                                })}
                                <div className="faixa-direita-echo"></div>
                            </div>
                            <div className="content-div-direita-filho2">
                                <div className="titulo1-echo"> Biografia </div>
                                <div className="align-direita2">
                                    <textarea
                                        id="lyrics"
                                        name="lyrics"
                                        rows="6"
                                        cols="40"
                                        value={text}
                                        onChange={handleChange}
                                    ></textarea>
                                    <button className="btn-direita2" onClick={submit}>Salvar conteúdo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mid-box-perfil3"></div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default PerfilArtista;





