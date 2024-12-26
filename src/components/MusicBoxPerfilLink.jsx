import myImage from '../Styles/backvibnewpng.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function MusicBoxPerfil(props) {
  
    const navigate = useNavigate();
    const url = "http://localhost:8080/echo/"
  
    const handleMusicBoxClick = () => {
        navigate(`/echolink/${props.id}`); 
      }

    return (
        <div  className="boxmusic22" onClick={handleMusicBoxClick}>               

            <img src={`${url}${props.blob}`} className="imagem-hover" style={{ objectFit: "cover", width: "100%", height: "100%" ,borderRadius:"20px 20px 20px 20px"}} alt="" />
          
        </div>

    )
}
export default MusicBoxPerfil