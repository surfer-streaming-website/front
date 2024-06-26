import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext, PlaylistContext } from "../../App";
import './Playlist.css';

const Playlist = ()=>{
    const {songInfo, setSongInfo, setPlaying, audio} = useContext(PlayerContext); //음악 재생 상태 전역 변수
    const {musicList, isVisible, setMusicList, currentSongIndex, setCurrentSongIndex} = useContext(PlaylistContext);
    const musicListUlRef = useRef(null);

    console.log("musicList="+musicList);

    useEffect(()=>{
        if(musicListUlRef.current){
            //이전에 추가된 모든 요소들 초기화
            musicListUlRef.current.innerHTML = '';
        }

        //뮤직 리스트 구현하기
        for(let i=0; i<musicList.length; i++){
            let li = `
                <li data-index="${i+1}" className='songListContainer'>
                ${i === currentSongIndex ? 
                    `<span>
                        <img className="img" src="${musicList[i].albumImage}" referrerPolicy="no-referrer"></img>
                        <strong className="songTitle">${musicList[i].songTitle}</strong>
                        <em className="songSingers">
                            ${musicList[i] && musicList[i].singers.map((singer, index)=>(
                            `<p className='singer' key=${singer.songSingerSeq}>
                                ${singer.songSingerName}
                                ${index !== musicList[i].singers.length-1 ? ', ': ''}
                            </p>`)).join(' ')}
                        </em>
                        <audio src="${musicList[i].soundSourceUrl}" class="audio${i}"></audio>
                        <div className="audioDuration" id="audio${i}">0:00</div>
                    </span>`
                    :
                    `<div>
                        <img className="img" src="${musicList[i].albumImage}" referrerPolicy="no-referrer"></img>
                        <strong className="songTitle">${musicList[i].songTitle}</strong>
                        <em className="songSingers">
                            ${musicList[i] && musicList[i].singers.map((singer, index)=>(
                            `<p className='singer' key=${singer.songSingerSeq}>
                                ${singer.songSingerName}
                                ${index !== musicList[i].singers.length-1 ? ', ': ''}
                            </p>`)).join(' ')}
                        </em>
                        <audio src="${musicList[i].soundSourceUrl}" class="audio${i}"></audio>
                        <div className="audioDuration" id="audio${i}">0:00</div>
                    </div>`
                }
                    
                </li>
            `;

            musicListUlRef.current.insertAdjacentHTML('beforeend', li);

            let liAudio = musicListUlRef.current.querySelector(`.audio${i}`);
            let liAudioDuration = musicListUlRef.current.querySelector(`#audio${i}`);

            //console.log(liAudioDuration);
            //console.log(liAudio)

            const loadedData = ()=>{
                let audioDuration = liAudio.duration;
                let totalMin = Math.floor(audioDuration / 60);
                let totalSec = Math.floor(audioDuration % 60);
                if(totalSec < 10) totalSec = `0${totalSec}`;

                liAudioDuration.innerText = `${totalMin}:${totalSec}`;
                liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);
            }

            if(liAudio){
                liAudio.addEventListener('loadeddata',loadedData);
                console.log(liAudioDuration);
            }

        }

    //뮤직 리스트 클릭하기
    const handleMusicClick = (index)=>{
        //console.log(index);
        const clickedSong = musicList[index];
        setSongInfo(clickedSong);
        const audioSrc = musicListUlRef.current.querySelector(`.audio${index}`).getAttribute('src');
        console.log(audioSrc);
        audio.src=audioSrc;
        audio.play();
        setPlaying(true);
        setCurrentSongIndex(index);
    }

    //클릭 이벤트 추가
    const liElements = musicListUlRef.current.querySelectorAll('li');
    liElements.forEach((li, index)=>{
        li.addEventListener('click', ()=>handleMusicClick(index))
    });

    //이벤트 제거
    return ()=>{
        liElements.forEach((li,index)=>{
            li.removeEventListener('click',()=>handleMusicClick(index));
        });
    }

    },[songInfo]); //songInfo가 바뀔 때에만 렌더링 되도록 한다!!!


    return(
        <div className={`musiclist ${isVisible ? 'visible':''}`}>
            <div className="coverSection">
                {songInfo && <img className='musicImage' referrerPolicy='no-referrer' src={songInfo.albumImage}></img>}
            </div>
            <div className='playlistSection'>
                <p className="text">재생중인 노래 목록</p>
                <ul className="musicListUl" ref={musicListUlRef}></ul>
            </div>
        </div>
    )
}

export default Playlist;
