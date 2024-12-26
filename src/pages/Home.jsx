import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import api from "../api";
import React, { useEffect } from 'react';
import SidebarContentOuvinte from "../components/SidebarContentOuvinte";
import perfil from '../Styles/perfil.css';
import Navbar from "../components/Navbar";
import MusicBox from "../components/MusicBox";
import MusicBoxNull from "../components/MusicBoxNull";
import image1 from '../Styles/20230405_122105.gif';
function HomeOuvinte() {

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
    const videoRef = useRef(null);

    useEffect(() => {
      videoRef.current.play();
    }, []);


    useEffect(() => {
        document.body.classList.add('home-perfil');
    }, []);




    return (
        <div className="pai-perfil" >
            <SidebarContentOuvinte />
            <div className="direita-perfil">
                <div className="gif-perfil">
                    <p className="undef">Descubra artistas incríveis de todo o mundo em apenas alguns passos</p>

                    <div className="testekk">

                    <img src={image1} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                    </div>

                    <div className="testekk2">
                        <a href="/explore"><button className="btn-faixa5">Comece a ouvir</button></a>
                        <div className="justif-pai">
                            <li className="justif">Acompanhe lançamentos em tempo real</li>
                            <li className="justif">Compartilhe seus artistas preferidos</li>
                            <li className="justif">Explore músicas sem limites</li>
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

    );

}

export default HomeOuvinte;

