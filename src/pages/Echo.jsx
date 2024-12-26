import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import api from "../api";
import React, { useEffect } from 'react';
import Meguel from "../components/Meguel";
import SidebarContent from "../components/SidebarContent";
import echo from '../Styles/echo.css';
import IconWithInfo from "../components/Information";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Echo(props) {
    const navigate = useNavigate();
    const validar = () => {
        const { tituloMusica, tituloAlbum } = inputFields[0];
        if (tituloMusica === "" || tituloAlbum === "") {
          toast.error("Nome do álbum/música não inseridos");
          return false;
        } else {
          return true;
        }
      }

    const [inputFields, setInputFields] = useState([
        {
            spotify: '', soundCloud: '', amazonMusic: '', otherPlataform1: '', youtube: '', deezer: '', appleMusic: '', otherLink1: ''
            , tituloMusica: '', tituloAlbum: '', compositor: '', genero: ''
        }
    ]);

    // const [valor, setValor] = useState('');

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    useEffect(() => {
        document.body.classList.add('echo-perfil');
    }, []);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const [text, setText] = useState('');
    const [imagem, setImagem] = useState(null);

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

    // const formRef = useRef();
   
    const api = axios.create({
        baseURL: 'http://localhost:8080'
      });
      
      const submit = async (e) => {
        e.preventDefault();
        toast.success("Cadastro de música em andamento");

        if (validar() !== false) {
          const textWithBreaks = text.replace(/\n\r?/g, '<br />');
      
          const imageFile = document.getElementById("imagem").files[0];
      
          const novoEcho = {
            artista: {
                idUsuario: dados.id,
            },
            spotify: inputFields[0].spotify,
            soundCloud: inputFields[0].soundCloud,
            amazonMusic: inputFields[0].amazonMusic,
            otherPlataform1: inputFields[0].otherPlataform1,
            youtube: inputFields[0].youtube,
            deezer: inputFields[0].deezer,
            appleMusic: inputFields[0].appleMusic,
            otherLink1: inputFields[0].otherLink1,
            tituloMusica: inputFields[0].tituloMusica,
            tituloAlbum: inputFields[0].tituloAlbum,
            compositor: inputFields[0].compositor,
            genero: inputFields[0].genero,
            lyrics: textWithBreaks
          };
      
          const formData = new FormData();
          formData.append("imagem", imageFile);
          formData.append("novoEcho", JSON.stringify(novoEcho));
      
          try {
            const response = await api.post("/echo", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
      
            if (response.status === 201) {
              toast.success("Música cadastrada com sucesso!");
              setTimeout(() => {
                navigate("/home");
              }, 2000);
            } else {
              toast.error("Erro ao realizar cadastro.");
            }
          } catch (error) {
            console.error(error);
            toast.error("Erro ao realizar cadastro. Verifique os campos e tente novamente.");
          }
        }
      };

    return (
        <div className="pai-echo">
            <SidebarContent />
            <ToastContainer />

            <div className="direita-echo">
                <div className="navbar-echo">
                    <p className="text-navbar-echo">ECHO SYSTEM - CADASTRAR MÚSICA</p> <Meguel/>
                </div>
                <div className="esquerda-filho-echo">
                    <div className="content-div-esquerda">
                        <div className="content-div-esquerda-filho">
                            <div className="circulo-echo">
                            {imagem && <img src={imagem} alt="Imagem selecionada" style={{ objectFit: "cover", width: "100%", height: "100%",borderRadius:"30px" }}/>}
                            </div>

                            <label htmlFor="imagem" className="custom-file-upload2" >
                                Inserir imagem da música
                            </label>
                            <input type="file" name="imagem" id="imagem" className="hidden"onChange={handleImagemChange} />
                        </div>
                        <div className="content-div-esquerda-filho2">
                            <div className="titulo1-echo-esquerda"> ECHO Links </div>
                            <div className="inputs-echo-esquerda">
                                {inputFields.map((input, index) => {
                                    return (
                                        <div className="esquerdo-inputs-esquerdo" key={index}>
                                            <p className="e-direita-echo">Spotify
                                                <input type="text" className="input-echo-e" name="spotify" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                            <p className="e-direita-echo">SoundCloud
                                                <input type="text" className="input-echo-e" name="soundCloud" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                            <p className="e-direita-echo">Amazon Music
                                                <input type="text" className="input-echo-e" name="amazonMusic" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                            <div className="faixa-direita-echo"></div>
                                            <div className="titulo2-echo-esquerda" >Prévia spotify </div>
                                            <p className="e-direita-echo2">URL do perfil
                                                <input type="text" className="input-echo-e" name="otherPlataform1" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                        </div>
                                    );
                                })}
                                {inputFields.map((input, index) => {
                                    return (
                                        <div className="esquerdo-inputs-direito" key={index}>
                                            <p className="e-direita-echo">Youtube
                                                <input type="text" className="input-echo-e" name="youtube" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                            <p className="e-direita-echo">Deezer
                                                <input type="text" className="input-echo-e" name="deezer" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                            <p className="e-direita-echo">Apple Music
                                                <input type="text" className="input-echo-e" name="appleMusic" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                            <div className="faixa-direita-echo"></div>
                                            <div className="titulo3-echo-esquerda" >  <IconWithInfo info="O ID de uma música pode ser localizado depois do track/ de uma URL Spotify" /></div>
                                            <p className="e-direita-echo2">ID da música
                                                <input type="text" className="input-echo-e" name="otherLink1" onChange={event => handleFormChange(index, event)} />
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="direita-filho-echo">
                    <div className="content-div-direita">
                        <div className="content-div-direita-filho">
                            <div className="titulo1-echo"> Informações da música </div>
                            {inputFields.map((input, index) => {
                                return (
                                    <div className="inputs-echo-direita" key={index}>
                                        <p className="p-direita-echo">Título da música *
                                            <input type="text" className="input-echo-d" name="tituloMusica" onChange={event => handleFormChange(index, event)} />
                                        </p>
                                        <p className="p-direita-echo">Título do album *
                                            <input type="text" className="input-echo-d" name="tituloAlbum" onChange={event => handleFormChange(index, event)} />
                                        </p>
                                        <p className="p-direita-echo">Compositor
                                            <input type="text" className="input-echo-d" name="compositor" onChange={event => handleFormChange(index, event)} />
                                        </p>
                                        <p className="p-direita-echo">Gênero *
                                            <input type="text" className="input-echo-d" name="genero" onChange={event => handleFormChange(index, event)} />
                                        </p>
                                    </div>
                                );
                            })}
                            <div className="faixa-direita-echo"></div>
                        </div>
                        <div className="content-div-direita-filho2">
                            <div className="titulo1-echo"> Lyrics </div>
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
    );
}

export default Echo;





