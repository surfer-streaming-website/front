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


    return(
        <div className="songItem">
            <p className="songNumber">{props.song.songNumber}</p>
            <Link className="songTitle" to={"/song/detail/"+props.song.songSeq}>{props.song.songTitle}</Link>
            <p className="songLike">🤍 10</p>
            <button className="listen" onClick={playSong}>
                <p>듣기</p>
            </button>
            <p className="playlist">담기</p>
            <p className="download">다운로드</p>
        </div>
    )

}

export default SongItem;

