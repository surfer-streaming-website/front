import { useContext } from "react";
import { Link } from "react-router-dom";
import { LogingedContext, PlayerContext, PlaylistContext } from "../../App";

const SongItem = (props)=>{

    const {isLoggedIn} = useContext(LogingedContext);
    const {audio, setPlaying, setSongInfo} = useContext(PlayerContext);
    const {setMusicList, musicList, currentSongIndex, setCurrentSongIndex} = useContext(PlaylistContext);

    const playSong = ()=>{
        //console.log("song"+props.song.albumImage);
        if(isLoggedIn){
            audio.src = props.song.soundSourceUrl;
            console.log(audio.src);
            audio.play(); //음악 재생
    
            setPlaying(true);
    
            const newSong = {
                songSeq: props.song.songSeq,
                albumImage: props.albumImage,
                songTitle: props.song.songTitle,
                singers: props.song.singers,
                soundSourceUrl: props.song.soundSourceUrl
            }
            setSongInfo(newSong);
            
            setMusicList(prevMusicList => [...prevMusicList, newSong]);
            setCurrentSongIndex(musicList.length);
            
          }else{
            alert('로그인하고 이용해주세요!');
          }
    }

    const songDownload = () => {
        if(!isLoggedIn){alert("로그인후 이용해주세요!")}else{
        const downloadUrl = `http://localhost:8080/api/song/download/${props.song.songSeq}`;
        window.location.href = downloadUrl;
    }
      };

    return(
        <div className="songItem">
            <p className="songNumber">{props.song.songNumber}</p>
            <Link className="songTitle" to={"/song/detail/"+props.song.songSeq}>{props.song.songTitle}</Link>
            <button className="listen" onClick={playSong}>
                <p>듣기</p>
            </button>
            <Link className="playlist" to="/playlist" state={{songSeq: props.song.songSeq}}>담기</Link>
            <p className="download" onClick={songDownload}>다운로드</p>
        </div>
    )

}

export default SongItem;

