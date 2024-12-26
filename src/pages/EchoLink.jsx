import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from 'react';
import api from "../api";
import { useParams } from 'react-router-dom';
import React from 'react';
import echolink from '../Styles/echolink.css';
import Lyrics from "../components/lyrics";
import PerfilEchoLink from "../components/PerfilEchoLink";
import ContentEchoLink from "../components/ContentEchoLink";
import LinksCore from "../components/LinksYoutube";
import { useNavigate } from 'react-router'
import BlurOverlay from "../components/BlurOverlay";
import { useCallback } from "react";
import { Helmet } from 'react-helmet';

function Echo() {
    const [showBlur, setShowBlur] = useState(true);
    const [loading, setLoading] = useState(true);
    const [musicas, setMusicas] = useState(null);
    const [imagem, setImagem] = useState(null);

    const { id } = useParams();


    
    useEffect(() => {
      document.body.classList.add('echolink');
    
      return () => {
        document.body.classList.remove('echolink');
      };
    }, []);

    const fetchLyrics = useCallback(async () => {
      try {
        const response = await api.get(`/echo/echolink/${id}`);
        const lyricsWithBreaks = response.data.lyrics.replace(/<br\s*\/?>/gi, '\n');
        setMusicas({ ...response.data, lyrics: lyricsWithBreaks });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, [id]);
  
    const fetchLyricss = useCallback(async () => {
      try {
        const response = await api.get(`/echo/echolink/${id}`);
        const visu = response.data?.visualizacao;
  
        if (visu !== undefined) {
          const usuarioAtualizado = {
            visualizacao: visu + 1
          };
  
          try {
            await api.patch(`/echo/visualizacao/${id}`, usuarioAtualizado, {
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
    }, [id]);
  
    useEffect(() => {
      fetchLyrics();
      fetchLyricss();
    }, [fetchLyrics, fetchLyricss]);
  
    if (loading) {
      return null;
    }
  
    return (
      <React.Fragment>
    <Helmet>
      <body className="echolink" />
    </Helmet>
    <div className={showBlur ? 'blur-effect' : ''}>
        <div className="direita-echolink">
          {musicas && musicas.lyrics ? (
            <React.Fragment>
              <ContentEchoLink blob={musicas.blob}
                               nome={musicas.tituloMusica}
                               compositor={musicas.compositor}
              />
              <Lyrics lyrics={<pre>{musicas.lyrics}</pre>} />
            </React.Fragment>
          ) : (
            <div style={{ marginLeft: '10px' }}>
              <ContentEchoLink />
            </div>
          )}
  
          <PerfilEchoLink
            username={musicas.artista.username}
            blob={musicas.artista.blob}
            nome={musicas.artista.username}
            spotify={musicas.artista.spotify}
            twitter={musicas.artista.twitter}
            instagram={musicas.artista.instagram}
            soundcloud={musicas.artista.soundcloud}

          />
  
          <BlurOverlay duration={1500} />
          <div className="mid-box-perfil4-echolink"></div>
        </div>
      </div>
      </React.Fragment>

    );
  }
  
  export default Echo;