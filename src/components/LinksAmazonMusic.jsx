import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import echolink from '../Styles/echolink.css';
import imgg from '../Styles/amazon.png'
import imgg2 from '../Styles/seta.png'
function LinksAmazonMusic(props) {
    const handleMusicBoxClick = () => {
        window.open(props.amazonMusic, '_blank')
        props.updateRedirect()

      }


    return (
        <div className="links-echolink-component-spotify" onClick={handleMusicBoxClick}>
        <div className="imagem-component-links">
            <img src={imgg} alt="" className="imagem-component-links3" />
        </div>
        <div className="setinha-echolink">
        <img src={imgg2} alt="" className="imagem-component-links-seta" />

        </div>

    </div>
    );
}

export default LinksAmazonMusic;
