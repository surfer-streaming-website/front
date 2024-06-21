import './AudioPlayer.css';

const AudioPlayer = ()=>{
    return(
        <div className="AudioPlayer">

            <img className="playerImage" referrerPolicy="no-referrer"></img>
            <button className="playButton">
                <p className="play">▶</p>
            </button>

        </div>
    )
}

export default AudioPlayer;