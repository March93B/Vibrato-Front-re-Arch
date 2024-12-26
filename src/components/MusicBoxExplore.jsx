import myImage from '../Styles/backvibnewpng.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function MusicBoxExplore(props) {
  
    const navigate = useNavigate();
    const url = "http://localhost:8080/echo/"
  
    const handleMusicBoxClick = () => {
        navigate(`/echolink/${props.id}`); 

      }

    return (
        <div  className="boxmusic2-explore" onClick={handleMusicBoxClick}>               

            <img src={`${url}${props.blob}`} className="imagem-hover-explore" style={{ objectFit: "cover", width: "100%", height: "100%" }} alt="" />
                <p className="text-name-music4" >
                {props.echo}
                </p>
            </div>
 

    )
}
export default MusicBoxExplore