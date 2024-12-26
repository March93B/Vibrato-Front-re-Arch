import React, { useState, useEffect } from 'react';
import axios from 'axios';
import testeApi from '../Styles/testeApi.css'

function SpotifyPlayer() {
  const [url, setUrl] = useState('');
  const [track, setTrack] = useState(null);
  const [token, setToken] = useState('');

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

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handlePreview = () => {
    axios.get(`https://api.spotify.com/v1/tracks/${url}`, {
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
  };

  return (
    <div>
      <input type="text" placeholder="URL da música" onChange={handleInputChange} />
      <button onClick={handlePreview}>Preview</button>
      {track && (
        <div>
          <h3 className="spotify-track-name">{track.name}</h3>
          <h4 className="spotify-artist-name">{track.artists.map(artist => artist.name).join(", ")}</h4>
          <audio
            className="spotify-audio-player"
            src={track.preview_url}
            controls controlsList="nodownload noplaybackrate "
            style={{ backgroundColor: "#282828",borderRadius: '14px'}}
          ></audio>        
            <div className="spotify-embed">
            <iframe
              className="spotify-embed-iframe"
              src={`https://open.spotify.com/embed/track/${track.id}`}
              width="500"
              height="300"
              frameBorder="0"
              allowtransparency="true"
              allowFullScreen="100px"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotifyPlayer;