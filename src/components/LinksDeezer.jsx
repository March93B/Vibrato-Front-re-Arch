import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import echolink from '../Styles/echolink.css';
import imgg from '../Styles/deezer.png'
import imgg2 from '../Styles/seta.png'
function LinksDeezer(props) {
    const handleMusicBoxClick = () => {
        window.open(props.deezer, '_blank')
        props.updateRedirect()
      }


    return (
        <div className="links-echolink-component-spotify"  onClick={handleMusicBoxClick}>
        <div className="imagem-component-links">
            <img src={imgg} alt="" className="imagem-component-links7" />
        </div>
        <div className="setinha-echolink">
        <img src={imgg2} alt="" className="imagem-component-links-seta" />

        </div>

    </div>
    );
}

export default LinksDeezer;
