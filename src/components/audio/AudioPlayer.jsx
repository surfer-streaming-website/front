import { useContext, useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';
import { LogingedContext, PlayerContext, PlaylistContext } from '../../App';
import { Link } from 'react-router-dom';

const AudioPlayer = ()=>{
    const {playing, setPlaying, audio, songInfo, setSongInfo} = useContext(PlayerContext); //음악 재생 상태 전역 변수
    const {isVisible, setIsVisible, musicList, currentSongIndex, setCurrentSongIndex} = useContext(PlaylistContext);

    const progressRef = useRef(null);
    const progressContainerRef = useRef(null);
    const [totalTime, setTotalTime] = useState('0:00');
    const [currentTime, setCurrentTime] = useState('0:00');
    let logingedCon = useContext(LogingedContext);

    //음악 재생
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

    //이전 곡 듣기
    const prevMusic = ()=>{
        console.log("prevMusic");
        if(currentSongIndex>0){
            const prevSong = musicList[currentSongIndex-1];
            setSongInfo(prevSong);
            audio.src=prevSong.soundSourceUrl;
            audio.play();
            setPlaying(true);
            setCurrentSongIndex(currentSongIndex-1);
        }else{
            alert('이전 곡이 없습니다.');
        }
    }
    
    //다음 곡 듣기
    const nextMusic = ()=>{
        if(currentSongIndex < musicList.length-1){
            const nextSong = musicList[currentSongIndex+1];
            setSongInfo(nextSong);
            audio.src = nextSong.soundSourceUrl;
            audio.play();
            setPlaying(true);
            setCurrentSongIndex(currentSongIndex+1);
        }else{
            alert('다음 곡이 없습니다.');
            setPlaying(false);
        }
    }
    
    //한 곡 재생이 끝나면 자동으로 다음 곡 재생
    useEffect(()=>{
        const handleEnded = ()=> {nextMusic();}
        audio.addEventListener('ended', handleEnded);
        return ()=>{
            audio.removeEventListener('ended', handleEnded);
        }
    }, [audio, nextMusic]);

    //뮤직 진행 바
    useEffect(()=>{
        const progress = progressRef.current;
        const progressContainer = progressContainerRef.current;


        const updateProgress = (e) => {
            const { duration, currentTime } = e.srcElement;
            const progressPer = (currentTime / duration) * 100;
            if (progress) {
                progress.style.width = `${progressPer}%`;
            }

            let currentMin = Math.floor(currentTime / 60);
            let currentSec = Math.floor(currentTime % 60);
            if(currentSec<10) currentSec = `0${currentSec}`;
            setCurrentTime(`${currentMin}:${currentSec}`);
            
        }
        const changeProgress = (e) => {
            const width = progressContainer.clientWidth;
            const offsetX = e.offsetX;
            const duration = audio.duration;
            audio.currentTime = (offsetX / width) * duration;
        };
        const loadedData = ()=>{
            let audioDuration = audio.duration;
            let totalMin = Math.floor(audioDuration/60);
            let totalSec = Math.floor(audioDuration % 60);
            if(totalSec < 10) totalSec = `0${totalSec}`;
            setTotalTime(`${totalMin}:${totalSec}`);
        }

        if (progressContainer) {
            progressContainer.addEventListener('click', changeProgress);
        }
        if (audio) {
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('loadeddata', loadedData);
        }

        return () => {
            if (progressContainer) {
                progressContainer.removeEventListener('click', changeProgress);
            }
            if (audio) {
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('loadeddata', loadedData);
            }
        };
    },[audio, songInfo]);

    const toggleMusicList = ()=>{
        setIsVisible(!isVisible);
    }

    return(
        <div className="AudioPlayer">
            <div className='progress-container' id='progress-container' ref={progressContainerRef}>
                <div className='progress' id='progress' ref={progressRef}></div>
            </div>
            {songInfo && logingedCon.isLoggedIn && <img className='playerImage' referrerPolicy='no-referrer' src={songInfo.albumImage}></img>}
            <Link className='songTitle' to={songInfo && "/song/detail/"+songInfo.songSeq}>{songInfo && songInfo.songTitle}</Link>
            <div className='singers'>
                {songInfo && songInfo.singers && songInfo.singers.map((singer, index)=>(<p className='singer' key={singer.songSingerSeq}>
                    {singer.songSingerName}
                    {index !== songInfo.singers.length-1 && ', '}
                    </p>))}
            </div>
            <button className='prevButton' onClick={prevMusic}>⏪</button>
            {playing ? (
                <button className="pauseButton" onClick={handlePlayPause}>
                    <p className="pause">■</p>
                </button>
            ) : (
                <button className="playButton" onClick={handlePlayPause}>
                    <p className="play">▶</p>
                </button>
            )}
            <button className='nextButton' onClick={nextMusic}>⏩</button>
            <div className='time'>
                <p className='currentTime'>{currentTime}</p>
                <p className='slash'>/</p>
                <p className='totalTime'>{totalTime}</p>
            </div>

            <button className='musicListButton' onClick={toggleMusicList}>playlist</button>
        </div>
    )
}

export default AudioPlayer;