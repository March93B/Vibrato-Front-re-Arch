import loading from '../Styles/loading3.gif';

function MusicBoxNull(props) {
    return (
        <div className="boxmusic1">
            <img src={loading} className="imagem-hover" style={{ objectFit: "cover", width: "100%", height: "100%",opacity:0.5}} alt="" />
            <div className="name-music2">
                <p className="text-name-music" >
                </p>
            </div>
        </div>

    )
}
export default MusicBoxNull