import { useContext, useRef, useState } from 'react';
import './AudioPlayer.css';
import { PlayerContext, AudioContext } from '../../App';

const AudioPlayer = ()=>{
    const {playing, setPlaying} = useContext(PlayerContext); //음악 재생 상태 전역 변수
    const {audio} = useContext(AudioContext);
    //const {image, setImage} = useContext(AudioContext);
    const {songInfo, setSongInfo} = useContext(AudioContext);

    const handlePlayPause = () =>{
        if(playing){
            //음악 재생 중이면 멈추기
            setPlaying(false); //전역 재생 상태 업데이트
            audio.pause(); //음악 멈추기
        }
        else{
            //멈춰있으면 재생
            setPlaying(true);
            audio.play(); //음악 다시 재생
        }
    }
    return(
        <div className="AudioPlayer">

            {/* {image && <img className="playerImage" referrerPolicy="no-referrer" src={image}></img>} */}
            {songInfo && <img className='playerImage' referrerPolicy='no-referrer' src={songInfo.albumImage}></img>}
            <p className='songTitle'>{songInfo && songInfo.songTitle}</p>
            <div className='singers'>
                {songInfo && songInfo.singers.map((singer, index)=>(<p className='singer' key={singer.songSingerSeq}>
                    {singer.songSingerName}
                    {index !== songInfo.singers.length-1 && ', '}
                    </p>))}
            </div>
            {playing ? (
                <button className="pauseButton" onClick={handlePlayPause}>
                    <p className="pause">■</p>
                </button>
            ) : (
                <button className="playButton" onClick={handlePlayPause}>
                    <p className="play">▶</p>
                </button>
            )}

        </div>
    )
}

export default AudioPlayer;