import myImage from '../Styles/backvibnewpng.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function MidPerfilLink(props) {
  
    const navigate = useNavigate();
    const url = "http://localhost:8080/echo/"
  
    const handleMusicBoxClick = () => {
        navigate(`/echolink/${props.id}`); 
      }

    return (
        <div  className="boxmusic222" onClick={handleMusicBoxClick}>               

            <img src={`${url}${props.blob}`} className="imagem-hover2" style={{ objectFit: "cover", width: "100%", height: "100%" }} alt="" />
          
        </div>

    )
}
export default MidPerfilLink