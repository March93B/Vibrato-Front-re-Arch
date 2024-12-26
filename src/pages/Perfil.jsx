import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import api from "../api";
import React, { useEffect } from 'react';
import SidebarContent from "../components/SidebarContent";
import perfil from '../Styles/perfil.css';
import Navbar from "../components/Navbar";
import MusicBox from "../components/MusicBox";
import MusicBoxNull from "../components/MusicBoxNull";
import image1 from '../Styles/bannersVib.gif';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Meguel from "../components/Meguel";

function Perfil() {

    const [musicas, setMusicas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {

        api.get("/echo/top5")
            .then((response) => {
                if (response.data.length == 0) {
                    console.log("RESPONSE: ", response)
                    console.log("MÚSICAS: ", response.data.length)
                    setTimeout(() => {
                        setMusicas(response.data);
                        setIsLoading(true)
                        console.log("MÚSICAS: ", response.data.length)
                        console.log("MÚSICAS: ", musicas)

                    }, 2000);
                } else {

                    setTimeout(() => {
                        setMusicas(response.data);
                        setIsLoading(false)

                    }, 2000);
                }
            }).catch((err) => {
                if (err.response.status == 404) {
                    console.log("Este endpoint não existe")
                } else {
                    console.error(err)
                }
            })
    }, []);



    function getMusicas() {
        setIsLoading(true)
        api.get("/echo/top5")
            .then((response) => {
                if (response.data.length == 0) {
                    console.log("RESPONSE: ", response)
                    console.log("MÚSICAS: ", response.data.length)
                    setTimeout(() => {
                        setMusicas(response.data);
                        setIsLoading(true)
                        console.log("RESPONSE: ", response)
                        console.log("MÚSICAS: ", musicas)

                    }, 2000);
                } else {

                    setTimeout(() => {
                        setMusicas(response.data);
                        setIsLoading(false)
                        console.log("RESPONSE: ", response)
                        console.log("MÚSICAS: ", musicas)

                    }, 2000);
                }
            }).catch((err) => {
                if (err.response.status == 404) {
                    console.log("Este endpoint não existe")
                } else {
                    console.error(err)
                }
            })

    }
;

    useEffect(() => {
        document.body.classList.add('home-perfil');

        return () => {
            document.body.classList.remove('home-perfil');
        };
    }, []);
    return (
        <React.Fragment>
            <Helmet>
                <body className="echolink" />
            </Helmet>
            <div className="pai-perfil" >
                <SidebarContent />

                <div className="direita-perfil">
                    
                    <div className="gif-perfil">
                        <p className="undef">Em poucos passos, faça sua música alcançar pessoas de todo o planeta</p>


                        <div className="testekk">

                            <img  src={image1} loop style={{ objectFit: "cover", width: "100%", height: "100%" }}>
                            </img>
                        </div>

                        <div className="testekk2">
                            
                            <a href="/echo"><button className="btn-faixa5">Publique sua música</button></a>
                            <div className="justif-pai">
                                <li className="justif">Publique sua música em poucos passos</li>
                                <li className="justif">Compartilhe prévias de seus lançamentos</li>
                                <li className="justif">Incentive a interação do público</li>
                            </div>
                        </div>
                    </div>

                    <div className="mid-box-perfil">
                        <div className="faixa">
                            <a href="/explore"><button className="btn-faixa">Explorar</button></a>
                            <p className="txtt">Acompanhe as últimas novidades em destaque da semana</p>
                            <button className="btn-faixa2" onClick={getMusicas}>#j-pop</button>
                            <button className="btn-faixa2">#rock</button>
                            <button className="btn-faixa2">#future core</button>

                        </div>

                    </div>


                    {isLoading ? (
                        <div className="box-musics-div" >
                            <MusicBoxNull />
                            <MusicBoxNull />
                            <MusicBoxNull />
                            <MusicBoxNull />
                            <MusicBoxNull />

                        </div>
                    ) : (
                        <div className="box-musics-div">
                            {
                                musicas.map((echo) => {
                                    return (
                                        <MusicBox
                                            key={echo.id}
                                            echo={echo.tituloMusica}
                                            id={echo.idEcho}
                                            blob={echo.blob}
                                        />
                                    )
                                })

                            }
                        </div>
                    )}

                    <div className="mid-box-perfil2">
                        <div className="faixa2">

                        </div>

                    </div>

                </div>

            </div>
        </React.Fragment>

    );

}

export default Perfil;

