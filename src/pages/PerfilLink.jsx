import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from 'react';
import api from "../api";
import { useParams } from 'react-router-dom';
import React from 'react';
import imgg from '../Styles/sound2.png'
import imgg2 from '../Styles/spotify.png'
import imgg3 from '../Styles/twitter.png'
import imgg4 from '../Styles/instagram.png'

import echolink from '../Styles/perfilLink.css';
import img from '../Styles/lic.png';
import { useNavigate } from 'react-router'
import BlurOverlay from "../components/BlurOverlay";
import ImagemPerfilLink from "../components/ImagemPerfilLink";
import MidPerfilLink from "../components/MidPerfilLink";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";

function PerfilLink() {
    const [usuario, setUsuario] = useState(null);
    const [last3, setLast3] = useState(null);
    const [visu, setVisu] = useState(null);
    const [tipos, setTipos] = useState(null);
    const [id, setId] = useState(null);

    const navigate = useNavigate();


    const { username } = useParams();

  
    useEffect(() => {
        const fetchLyrics = async () => {
          try {
            const response = await api.get(`/usuarios/perfill/${username}`);
            setUsuario(response.data);
            setId(response.data.idUsuario);
            setTipos(response.data.tipoUsuario);
      
            const visu = response.data?.visualizacao;
      
            if (visu !== undefined) {
              const usuarioAtualizado = {
                idUsuario: response.data.idUsuario,
                visualizacao: visu + 1,
              };
      
              const formData = new FormData();
              formData.append("usuario", JSON.stringify(usuarioAtualizado));
      
              try {
                const response = await api.patch("/usuarios", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
                console.log(response.data.visualizacao);
              } catch (error) {
                console.error(error);
              }
            }
      
            if (response.data.tipoUsuario !== "Artista") {
              navigate('/explore');
            }
          } catch (err) {
            console.error(err);
          }
        };
      
        fetchLyrics();
      }, [username, navigate]);

      useEffect(() => {
        document.body.classList.add('echolink');
      }, []);

useEffect(() => {
    const fetchLyrics = async () => {
        try {
            const response = await api.get(`/echo/last33/${username}`);
            setLast3(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    fetchLyrics();
}, [id]);
useEffect(() => {
    const fetchLyrics = async () => {
        try {
            const response = await api.get(`/echo/visuu/${username}`);
            setVisu(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    fetchLyrics();
}, [id]);

const handleCopyToClipboard = () => {
    const link = `http://localhost:80/artists/${username}`; 

    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success('Link copiado!');

        console.log('Link copiado para a área de transferência: ' + link);
      })
      .catch((error) => {
        console.error('Erro ao copiar o link: ', error);
      });
  };


  var valor01
    if (tipos ==="Artista") {
        var valor01 = "artista"
    }else{
        var valor01 = "ouvinte"

    }

  const linkspot = () => {
    window.open(`${usuario.spotify}`, '_blank');

  };
  const linktwitter = () => {
    window.open(`${usuario.twitter}`, '_blank');

  };
  const linksound = () => {
    window.open(`${usuario.soundcloud}`, '_blank');

  };
  const linkinsta = () => {
    window.open(`${usuario.instagram}`, '_blank');

  };








  const api = axios.create({
    baseURL: 'http://localhost:8080'
});
    const url = "http://localhost:8080/echo/"

    return (
        <div className="perfil-link">
                        <ToastContainer />

            <div className="pai-perfil-link">

                <ImagemPerfilLink blob={usuario ? usuario.blob : null} />

                <div className="pai-mid-perfil-link">
                    <div className="mid-perfil-link">
                        <div className="nome-mid-perfil-link">
                            <p className="nomeuser-link">{usuario ? usuario.username : null}</p>
                        </div>
                        <div className="nome2-mid-perfil-link">
                            <div className="nome3-mid-perfil-link">
                                <p>Últimos lançamentos</p>
                            </div>
                        </div>
                        <div className="cima-mid-perfil-link">
                          <div className="cima-mid-perfil-link-f">
                            {last3 ? (
                                last3.slice(0, 3).map((echo) => (
                                    <MidPerfilLink
                                        key={echo.id}
                                        id={echo.idEcho}
                                        blob={echo.blob}
                                    />
                                ))
                            ) : (
                                <p>...</p>
                            )}
                        </div>
                        </div>

                        <div className="meio-mid-perfil-link">
                            <div className="meio2-mid-perfil-link"></div>

                        </div>

                        <div className="nome2-mid-perfil-link">
                            <div className="nome3-mid-perfil-link">
                                <p>Principais faixas</p>
                            </div>
                        </div>
                        <div className="baixo-mid-perfil-link">
                        <div className="baixo-mid-perfil-link-f"> 
                            {visu ? (
                                visu.slice(0, 3).map((echo) => (
                                    <MidPerfilLink
                                        key={echo.id}
                                        id={echo.idEcho}
                                        blob={echo.blob}
                                    />
                                ))
                            ) : (
                                <p>...</p>
                            )}
                        </div>
                        </div>

                    </div>

                </div>

                <div className="pai-bio-perfil-link">
                    <div className="bio-perfil-link">
                        <div className="um001">
                            <div className="info-artistas-link">
                                <div className="nome3-mid-perfil-link">
                                    <p className="informacoes-do-artista">Informações do {valor01}</p>
                                </div>
                            </div>
                        </div>
                        <div className="um001">

                            <div className="nome-artista-bio">
                                <div className="nome3-mid-perfil-link">
                                    <p>{usuario ? usuario.username : null}</p>
                                </div>
                            </div>
                        </div>
                        <div className="um001">

                            <div className="bio-artista-link">
                                <p className="bio-text">{usuario ? usuario.biografia : null}</p>

                            </div>
                        </div>
                        <div className="um001">

                            <div className="bio-redes">
                                <p >Redes sociais</p>

                            </div>
                        </div>
                        <div className="um001">

                            <div className="redes-icons">
                                {
                                    usuario && usuario.spotify ? (
                                        <img onClick={linkspot} className="spotifyyyy" src={imgg2}  />
                                    ) : null
                                }
                                {
                                    usuario && usuario.twitter ? (
                                        <img onClick={linktwitter} className="twitterrrr" src={imgg3}  />
                                    ) : null
                                }
                                     {
                                    usuario && usuario.instagram ? (
                                        <img onClick={linkinsta} className="instaaaa" src={imgg4}   />
                                    ) : null
                                }
                                {
                                    usuario && usuario.soundcloud ? (
                                        <img onClick={linksound} className="soundddd" src={imgg} />
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className="um001">

                            <div className="bio-artista-nome-baixo">
                                <p >{usuario ? usuario.username : null}</p>

                            </div>
                        </div>



                    </div>

                </div>

                <div className="pai-footer-perfil-link">
                    <div className="footer-perfil-link">
                        <p draggable onClick={handleCopyToClipboard} className="compartilhe-link">Compartilhar página</p>

                    </div>

                </div>
                <div className="pai-vibrato-perfil-link">
                    <div className="aa-perfil-link">
                        <p className="vibrato-link">VIBRATO</p>
                    </div>

                </div>


            </div>

            {usuario && <img className="imagem-echolink" src={`${url}${usuario.blob}`} alt="" />}
        </div>

    );
}

export default PerfilLink;
