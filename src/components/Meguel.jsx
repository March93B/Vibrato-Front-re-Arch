import myImage from '../Styles/lic.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../api';
function Meguel(props) {
    const dados = JSON.parse(sessionStorage.getItem('dados'));

    useEffect(() => {
        const fetchLyrics = async () => {
            try {
                const response = await api.get(`/usuarios/perfil/${dados.id}`);

                setImagemExist(response.data.blob)
            } catch (err) {
                console.error(err);
            }
        };

        fetchLyrics();
    }, [dados.id]);
   
    const [imagemExist, setImagemExist] = useState(null);
    const [imagem, setImagem] = useState(null);
    const url = "http://localhost:8080/echo/"

    const linkPerfil = () => {
        window.open(`http://localhost:80/${dados.username}`, '_blank');

    };
    console.log(`${url}${imagemExist}`)
    return (
       <div>
       <button className="custom-file-upload3" onClick={linkPerfil}>
            
            {imagemExist && !imagem && (
            <img
                src={`${url}${imagemExist}`}
                alt="Imagem existente"
                style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '30px' }}
            />
        )}

    

        </button>
        </div>
    );
}

export default Meguel;