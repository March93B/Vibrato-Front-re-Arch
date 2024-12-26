import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from 'react';
import api from "../api";
import { useParams } from 'react-router-dom';
import React from 'react';
import { Helmet } from 'react-helmet';
import echolink from '../Styles/explore.css';
import { useNavigate } from 'react-router'
import axios from "axios";
import MusicBoxNullE from "../components/MusicBoxNullExplore";
import MusicBoxExplore from "../components/MusicBoxExplore";
import DropdownExplore from "../components/DropdownExplore";
import Meguel from "../components/Meguel";
function Explore() {
  
    const options = [
        { label: "Gêneros", value: "1" },
        { label: "Rock", value: "2" },
        { label: "Pop", value: "3" },
        { label: "Future Core", value: "4" },
        { label: "K-Pop", value: "5" },
        { label: "J-Rock", value: "6" },
        { label: "Hip Hop/Rap", value: "7" },
        { label: "R&B/Soul", value: "8" },
        { label: "Indie", value: "9" },
        { label: "EDM", value: "10" },
        { label: "EDM-Kawaii", value: "11" },
        { label: "Jazz", value: "12" },
        { label: "Sertanejo", value: "13" },
        { label: "Eletro Swing", value: "14" },
        { label: "Pagode", value: "15" }


    ];
    const [musicas, setMusicas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState(options[0].value);
    const dados = JSON.parse(sessionStorage.getItem('dados'));

   
    var valor01
    if (dados.tipoUsuario ==="Artista") {
        var valor01 = "/home"
    }else{
        var valor01 = "service"

    }


    useEffect(() => {
        api.get("/echo/explore")
          .then((response) => {
            if (response.data.length === 0) {
              setTimeout(() => {
                setMusicas(response.data);
                setIsLoading(true);
                console.log(response);
              }, 2000);
            } else {
              setTimeout(() => {
                setMusicas(response.data);
                setIsLoading(false);
                console.log(response);
              }, 2000);
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 404) {
              console.log("Este endpoint não existe");
            } else {
              console.error(err);
            }
          });
      }, []);

   
      const handleOptionSelect = (value) => {
        setSelectedValue(value);
        setIsLoading(true); 
      
        if (value === "1") {
          api.get("/echo/explore")
            .then((response) => {
              setTimeout(() => {
                setMusicas(response.data);
                setIsLoading(false);
                console.log("RESPONSE: ", response);
                console.log("MÚSICAS: ", response.data.length);
              }, 2000);
            })
            .catch((err) => {
              if (err.response && err.response.status === 404) {
                console.log("Este endpoint não existe");
              } else {
                console.error(err);
              }
            });
        } else if (value === "2") {
          api.get("/echo/genero/rock")
            .then((response) => {
              setTimeout(() => {
                setMusicas(response.data);
                setIsLoading(false);
                console.log("RESPONSE: ", response);
                console.log("MÚSICAS: ", response.data.length);
              }, 2000);
            })
            .catch((err) => {
              if (err.response && err.response.status === 404) {
                console.log("Este endpoint não existe");
              } else {
                console.error(err);
              }
            });
        } else if (value === "3") {
            api.get("/echo/genero/pop")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "4") {
            api.get("/echo/genero/future-core")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log(response);

                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "5") {
            api.get("/echo/genero/kpop")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "6") {
            api.get("/echo/genero/jrock")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "7") {
            api.get("/echo/genero/hip-hop-rap")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "8") {
            api.get("/echo/genero/r&b-soul")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "9") {
            api.get("/echo/genero/indie")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "10") {
            api.get("/echo/genero/edm")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "11") {
            api.get("/echo/genero/edm-kawaii")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "12") {
            api.get("/echo/genero/jazz")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "13") {
            api.get("/echo/genero/sertanejo")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "14") {
            api.get("/echo/genero/eletro-swing")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 
          else if (value === "15") {
            api.get("/echo/genero/pagode")
              .then((response) => {
                setTimeout(() => {
                  setMusicas(response.data);
                  setIsLoading(false);
                  console.log("RESPONSE: ", response);
                  console.log("MÚSICAS: ", response.data.length);
                }, 2000);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  console.log("Este endpoint não existe");
                } else {
                  console.error(err);
                }
              });
          } 

        else {
            setIsLoading(false);
        }
      };
      
    useEffect(() => {
        if (selectedValue) {
        }
      }, [selectedValue]);
  


    useEffect(() => {
        document.body.classList.add('explorer');

        return () => {
            document.body.classList.remove('explorer');
        };
    }, []);





    return (
        <React.Fragment>
            <Helmet>
                <body className="explorer" />
            </Helmet>
            <div className="qualquercoisaa">

                <div className="pai-explore">
                    <div className="navbar-explore">
                        <div className="vibrato-explore">
                         <a href={valor01}>  <p className="vibrato-explore-n">VIBRATO</p></a> 
                        </div>

                        <div className="selects-explore">
                            <div className="selects-explore-filho">
                            <DropdownExplore options={options} onSelect={handleOptionSelect} />
                                </div>
                               <div className="button-input">
                                <input type="text" className="input-echo-explore" />
                                <button className="button-explore55"><span className="fa fa-search mr-3"></span></button>
                                </div>
                                <Meguel/>
                            </div>
                       
                    </div>
                    <div className="pai-mid-explore">
                            
                        <div className="mid-perfil-explore">
                        {isLoading ? (
                                <div className="box-musics-div3">
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                    <MusicBoxNullE />
                                </div>
                            ) : musicas.length === 0 ? (
                                <div className="box-musics-div3">
                                    <p>Nenhum resultado encontrado.</p>
                                </div>
                            ) : (
                                <div className="box-musics-div3">
                                    {musicas.map((echo) => (
                                        <MusicBoxExplore
                                            key={echo.id}
                                            echo={echo.tituloMusica}
                                            id={echo.idEcho}
                                            blob={echo.blob}
                                        />
                                    ))}
                                </div>
                            )}
<div className="coisa-explore2"></div>

                        </div>
                    </div>





                </div>

            </div>
        </React.Fragment>

    );
}

export default Explore;
