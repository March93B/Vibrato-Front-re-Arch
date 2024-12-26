import myImage from '../Styles/lic.png';
import { useParams } from 'react-router-dom';

function ImagemPerfilLink(props) {
    const url = "http://localhost:8080/echo/";

    if (!props.blob) {
        return (
            <div className="pai-imagem-perfil-link">
                <div className="imagem-perfil-link" style={{  backgroundColor: "#252525"  }}>
                </div>
            </div>
        );
    }

    return (
        <div className="pai-imagem-perfil-link">
            <div className="imagem-perfil-link">
                <img src={`${url}${props.blob}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
        </div>
    );
}

export default ImagemPerfilLink;
