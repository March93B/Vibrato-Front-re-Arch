import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import Navbar from "../components/Navbar";
import "../Styles/inicio.css";
import FooterCL from "../components/FooterCL";
import React, { useEffect } from 'react';
import imagem1 from "../Styles/Logo.png"
import imagem2 from "../Styles/ouvinte.jpg"
import imagem3 from "../Styles/artista.jpg"
import imagem4 from "../Styles/estatistica.jpg"
import imagem5 from "../Styles/teste001.png"

function Inicio() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="card">
                    <div className="titulo">
                        <div draggable className="logo-home">
                            VIBRATO
                        </div>
                        <p draggable> Os sons do futuro ecoam pelo mundo.</p>
                    </div>
                </div>
                <div className="card-b">
                    <div className="sub-card-a">
                        <p draggable>Serviços</p>
                    </div>
                    <div className="sub-card-b">
                        <div className="cardb">
                            <h1 className="h1-home" draggable>Ouvintes</h1>
                            <img src={imagem2} />
                            <div className="card-texto" id="txt1">
                                <p className="texto-home" draggable>Siga seus artistas favoritos em suas redes sociais e receba notificações de seus novos lançamentos.</p>
                            </div>

                        </div>
                        <div className="cardb">
                            <h1 className="h1-home" draggable>Músicos</h1>
                            <img src={imagem3} />
                            <div className="card-texto" id="txt2">
                                <p className="texto-home" draggable>Compartilhe suas redes sociais, insira prévias de suas músicas e álbuns, personalize seu perfil.</p>
                            </div>
                        </div>
                        <div className="cardb">
                            <h1 className="h1-home" draggable>Estatísticas</h1>
                            <img src={imagem4} />
                            <div className="card-texto" id="txt3">
                                <p className="texto-home" draggable>Saiba quais foram os Top Hits, músicas ou álbuns mais acessados com o serviço Vibrato.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="card-c" style={{
                    backgroundImage: `url(${imagem5})`,
                    backgroundSize: 'cover',
                    objectFit: "cover"
                }}>

                    <div className="sub-card-c">

                        <div className="separador">

                            <div className="container-titulo">
                                <div className="titulo-a">
                                    <h1>ECHO</h1>
                                </div>
                                <div className="titulo-b">
                                    <h1>SYSTEM</h1>
                                </div>
                            </div>

                            <p className="texto-inicio-echo"> O Echo System é um inovador sistema de geração de links que simplifica o compartilhamento de conteúdo
                                online. Com recursos de personalização, análise em tempo real, integração com outras plataformas e
                                medidas de segurança avançadas, oferece uma solução abrangente para alcançar um público mais amplo e
                                obter resultados efetivos na disseminação de informações na internet. </p>
                                
                            <button className="saiba-mais">Saiba mais</button>
                        </div>

                    </div>
                    <FooterCL />

                </div>

            </div>

        </div>

    );
}



export default Inicio;