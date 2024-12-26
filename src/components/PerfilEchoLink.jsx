import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import echolink from '../Styles/echolink.css';
import image1 from '../Styles/image4.png';
import image2 from '../Styles/botaopause.png';
import image3 from '../Styles/botaoplay.png';
import image4 from '../Styles/icone-spotify-branco.png';
import axios from 'axios';
import imgg from '../Styles/sound2.png'
import imgg2 from '../Styles/spotify.png'
import imgg3 from '../Styles/twitter.png'
import imgg4 from '../Styles/instagram.png'
import imgg5 from '../Styles/compartilhar.png'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import api from "../api";
function PerfilEchoLink(props) {
  const [track, setTrack] = useState(null);
  const [token, setToken] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const [idArtista, setIdArtista] = useState(null);
  const [dadosArtista, setdadosArtista] = useState(null);
  const [executed, setExecuted] = useState(false);
  const [executed2, setExecuted2] = useState(false);

  const [musicas, setMusicas] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    api.get(`/echo/echolink/${id}`)
      .then((response) => {
        setMusicas(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const urlMusica = musicas.otherLink1;

  useEffect(() => {
    const CLIENT_ID = '654f22146f75469296716116ef4fe9d9';
    const CLIENT_SECRET = '4356007d93504cdbbb54d48861567992';

    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: 'grant_type=client_credentials',
      headers: {
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      }
    })
      .then(response => {
        const token = response.data.access_token;
        setToken(token);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  useEffect(() => {
    if (!token || !urlMusica) return;

    axios.get(`https://api.spotify.com/v1/tracks/${urlMusica}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        market: 'JP', 
      },
    })
      .then(response => {
        setTrack(response.data);
        setIdArtista(response.data.artists[0].id)
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  }, [token, urlMusica]);


  async function updateStreams() {
    try {
      const response = await api.get(`/echo/echolink/${id}`);
      const streams = response.data?.streams;

      if (streams !== undefined) {
        const usuarioAtualizado = {
          streams: streams + 1
        };

        try {
          await api.patch(`/echo/streams/${id}`, usuarioAtualizado, {
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

  async function updateShare() {
    try {
      const response = await api.get(`/echo/echolink/${id}`);
      const share = response.data?.curtidas;

      if (share !== undefined) {
        const usuarioAtualizado = {
          curtidas: share + 1
        };

        try {
          await api.patch(`/echo/curtidas/${id}`, usuarioAtualizado, {
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
  const navigate = useNavigate();

  // 5fIZxtu9KYwRi3MnLEVLCC
  const artista = idArtista;


  useEffect(() => {
    if (!token || !artista) return;

    axios.get(`https://api.spotify.com/v1/artists/${artista}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        setdadosArtista(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token, artista]);


  const linkPerfil = () => {
    window.open(`http://localhost:80/artists/${props.username}`, '_blank');

  };



  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play();
    console.log(track);
    console.log(urlMusica)

    if (!executed) {
      updateStreams()
      setExecuted(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();

  };
  const linkspot = () => {
    window.open(`${props.spotify}`, '_blank');

  };
  const linktwitter = () => {
    window.open(`${props.twitter}`, '_blank');

  };
  const linksound = () => {
    window.open(`${props.soundcloud}`, '_blank');

  };
  const linkinsta = () => {
    window.open(`${props.instagram}`, '_blank');

  };

  const handleCopyToClipboard = () => {
    const link = `http://localhost:8080/echolink/${id}`;

    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success('Link copiado!');

        console.log('Link copiado para a área de transferência: ' + link);
      })
      .catch((error) => {
        console.error('Erro ao copiar o link: ', error);
      });
      if (!executed2) {
        updateShare()
        setExecuted2(true);
      }
  };


  const url = "http://localhost:8080/echo/"
  return (
    <div className="mid-box-perfil3-echolink">
      <div className="pai-a3">
        <div className="a3" draggable="false">
          <img src={`${url}${props.blob}`} onClick={linkPerfil} alt="" style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }} />

        </div>



        <div onClick={linkPerfil} className="nome-a3" draggable>
          {props.nome}
        </div>

      </div>
      {/* <iframe draggable style={{borderRadius: '0px 0px 0px 0px',pointerEvents:"none", marginRight:"70px", marginTop:"45px"}} src="https://open.spotify.com/embed/track/3fWnFZHiEeuLgkU8MHrky9?utm_source=generator" width="630" height="230" frameBorder="0" allowFullScreen="" allow="autoplay;" loading="lazy"></iframe> */}
      <div className="particao-perfil-echolink">
        <div className="preview-echolink">
          {track && (

            <div className="preview-imagem">
              <img src={track.album.images[0].url} alt="" style={{ width: "150px", height: "135px", borderRadius: "10px", marginLeft: "25px", objectFit: "cover" }} />

            </div>
          )}

          {track && (
            <div className="preview-infos">
              <div className="artist-names">
                <p className="artist-names-p">
                  {track.name}
                </p>
              </div>
              <div className="artist-feat">
                <p className="artist-feat-p">
                  {track.artists.map(artist => artist.name).join(", ")}</p>
              </div>
            </div>
          )}
          <div className="logos-link">
            {track && (
              <div className="botao-spotify">
                <a href={track.external_urls.spotify} target="_blank"><img src={image4} alt="" style={{ width: "30px", height: "30px" }} /></a>

              </div>
            )}
            <div className="botao-play-pause">
              {!isPlaying && (
                <img onClick={handlePlay} src={image3} alt="" style={{ width: "43px", height: "43px" }} />
              )}
              {isPlaying && (
                <img onClick={handlePause} src={image2} alt="" style={{ width: "43px", height: "33px", marginBottom: "5px" }} />
              )}

            </div>

          </div>
              
          {track && (
            <audio
              src={track.preview_url}
              hidden
              ref={audioRef}
              controls controlsList="nodownload noplaybackrate "
              style={{ backgroundColor: "#282828", borderRadius: '14px' }}
            ></audio>
          )}
        </div>
        <div className="redes-sociais-perfil-echolink">
          <p>Redes sociais</p>
        </div>
        <div className="redes-icons-perfil-echolink">
          {
            props && props.spotify ? (
              <img onClick={linkspot} className="spotifyyy-echolink" src={imgg2} />
            ) : null
          }
          {
            props && props.twitter ? (
              <img onClick={linktwitter} className="twitterrrr-echolink" src={imgg3} />
            ) : null
          }
          {
            props && props.instagram ? (
              <img onClick={linkinsta} className="instaaaa-echolink" src={imgg4} />
            ) : null
          }
          {
            props && props.soundcloud ? (
              <img onClick={linksound} className="soundddd-echolink" src={imgg} />
            ) : null
          }
          <div className="botao-comp-echolink" draggable onClick={handleCopyToClipboard}>
            <img src={imgg5} className="soundddd-echolink2" alt="" />

            <p className="comp-txt-echolink">Compartilhar</p>                       
             <ToastContainer />


          </div>
        </div>
      </div>
    </div>
  );
}
// width="630" height="230"
export default PerfilEchoLink;








