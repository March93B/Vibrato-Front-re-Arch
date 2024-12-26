import myImage from '../Styles/backvibnewpng.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function MusicBox(props) {
  
    const navigate = useNavigate();
    const url = "http://localhost:8080/echo/"
  
    const handleMusicBoxClick = () => {
        navigate(`/echolink/${props.id}`); 
      }

    return (
        <div  className="boxmusic2" onClick={handleMusicBoxClick}>               

            <img src={`${url}${props.blob}`} className="imagem-hover" style={{ objectFit: "cover", width: "100%", height: "100%" }} alt="" />
            <div className="name-music">
                <p className="text-name-music" >
                {props.echo}
                </p>
            </div>
        </div>

    )
}
export default MusicBox