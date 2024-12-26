import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import echolink from '../Styles/echolink.css';
import imgg from '../Styles/image7.jpg'
import LinkSoundCloud from "./LinkSoundCloud";
import LinkSpotify from "./LinkSpotify";
import LinksAmazonMusic from "./LinksAmazonMusic";
import LinksAppleMusic from "./LinksAppleMusic";
import LinksDeezer from "./LinksDeezer";
import LinksYoutube from "./LinksYoutube";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import axios from "axios";

function ContentEchoLink(props) {
    const [token, setToken] = useState('');
    const [track, setTrack] = useState(null);
    const [musicas, setMusicas] = useState([]);
    const [musicas2, setMusicas2] = useState([]);
    const { id } = useParams();
    const [executed, setExecuted] = useState(false);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/echo/echolink/${id}`);
                setMusicas(response.data);
                const musicasArray = response.data.spotify;
                setMusicas2(musicasArray);
                const CLIENT_ID = '654f22146f75469296716116ef4fe9d9';
                const CLIENT_SECRET = '4356007d93504cdbbb54d48861567992';

                const tokenResponse = await axios({
                    method: 'post',
                    url: 'https://accounts.spotify.com/api/token',
                    data: 'grant_type=client_credentials',
                    headers: {
                        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
                    }
                });

                const token = tokenResponse.data.access_token;
                setToken(token);

                if (response.data.otherLink1 && token) {
                    const trackResponse = await axios.get(`https://api.spotify.com/v1/tracks/${response.data.otherLink1}`, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });

                    setTrack(trackResponse.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const urlMusica = musicas.otherLink1;
    const spotify = musicas.spotify;
    const sound = musicas.soundCloud;
    const deezer = musicas.deezer;
    const youtube = musicas.youtube;
    const amazonMusic = musicas.amazonMusic;
    const appleMusic = musicas.appleMusic;
    const url = "http://localhost:8080/echo/"


    useEffect(() => {
        if (!token) return;

        axios.get(`https://api.spotify.com/v1/tracks/${urlMusica}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                setTrack(response.data);
            })
            .catch(error => {
                console.log(error);


                
            });
    }, [token]);

    async function updateRedirect() {
        try {
          const response = await api.get(`/echo/echolink/${id}`);
          const redirect = response.data?.redirecionamento;
      
          if (redirect !== undefined) {
            const usuarioAtualizado = {
                redirecionamento: redirect + 1
            };
      
            try {
              await api.patch(`/echo/redirecionamento/${id}`, usuarioAtualizado, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            } catch (error) {
              console.error(error);
            }
          }
        } catch (err) {
          console.error(err);
        }
      }

    const components = [
        { component: LinkSpotify, props: { spotify, updateRedirect } },
        { component: LinksYoutube, props: { youtube , updateRedirect} },
        { component: LinkSoundCloud, props: { sound , updateRedirect} },
        { component: LinksAmazonMusic, props: { amazonMusic, updateRedirect } },
        { component: LinksAppleMusic, props: { appleMusic , updateRedirect} },
        { component: LinksDeezer, props: { deezer , updateRedirect} }
    ];
    let aaaa = 0
    return (
        <div className="esquerda-filho-echolink">
            <div className="content-div-esquerda-echolink">
                <div className="content-div-esquerda-filho-echolink">
                    <div className="circulo-echolink" >
                   <img src={`${url}${musicas.blob}`} style={{ width: "100%", height: "100%", borderRadius: "10px 10px 0px 0px", objectFit: "cover" }}/>
                    </div>
                  <div className="nome-musica-content-echolink">
                    <div className="nome-musica-content-echolink-nome">
                      <p className="nome-nome-nome">{props.nome}</p>
                    </div>
                    <div className="nome-musica-content-echolink-nome">
                    <p className="comp-nome-nome">{props.compositor}</p>
                    </div>
                  </div>
               </div>
                <div className="content-div-esquerda-filho2-echolink">
                {components.map(({ component: Component, props }, index, components) => {
          if (
            (Component === LinkSpotify && (!props.spotify || props.spotify === null)) ||
            (Component === LinksYoutube && (!props.youtube || props.youtube === null)) ||
            (Component === LinkSoundCloud && (!props.sound || props.sound === null)) ||
            (Component === LinksAmazonMusic && (!props.amazonMusic || props.amazonMusic === null)) ||
            (Component === LinksAppleMusic && (!props.appleMusic || props.appleMusic === null)) ||
            (Component === LinksDeezer && (!props.deezer || props.deezer === null))
          ) {
            return null;
          }

        const isFirst = index === 0;
        const isLast = index === components.length -1;
        const componentClasses = `${isFirst ? 'first-component' : ''} ${isLast ? 'middle-component' : ''} ${isFirst || isLast ? '' : 'middle-component'}`;

        return (
          <div className={componentClasses} key={index}>
            <Component {...props} updateRedirect={updateRedirect}/>
          </div>
        );
      })}
                </div>
            </div>
      

                <img className="imagem-echolink" src={`${url}${musicas.blob}`} alt="" />
         
        </div>
    );
}

export default ContentEchoLink;
