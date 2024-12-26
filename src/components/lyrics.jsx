import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import echolink from '../Styles/echolink.css';

function Lyrics(props) {


    return (
          <div className="direita-filho-echolink">
                        <div className="content-div-direita-filho-echolink">
                            <div draggable className="letra-echolink">
                            <div className="div-lyrics-lyrics">Lyrics</div>
                            {props.lyrics}

                            </div>




                    </div>
                </div>

    );
}

export default Lyrics;
