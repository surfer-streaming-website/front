import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Pagination from "react-js-pagination";
import { Link, useLocation } from "react-router-dom";
import SongReplyItem from "./SongReplyItem.jsx";
import InsertSongreply from "./InsertSongReply";
import './SongInfoBox.css';
import './Lyrics.css';
import { LogingedContext, PlayerContext, PlaylistContext } from "../../App.jsx";

const SongInfo = (props) => {

    const [songBoardInfo, setSongBoardInfo] = useState(props.songInfo || {});
    const replies = songBoardInfo ? songBoardInfo.replies : null;
    const [page, setPage] = useState(1); //현재 페이지 번호
    const [sort, setSort] = useState('regDate'); //현재 댓글 정렬 기준
    const composerList = songBoardInfo && songBoardInfo.producerDTO ? songBoardInfo.producerDTO.composerList : [];
    const lyricistList = songBoardInfo && songBoardInfo.producerDTO ? songBoardInfo.producerDTO.lyricistList : [];
    const arrangerList = songBoardInfo && songBoardInfo.producerDTO ? songBoardInfo.producerDTO.arrangerList : [];
    const albumImage = songBoardInfo ? songBoardInfo.albumImage : null;
    const location = useLocation();
    // const [playing, setPlaying] = useState(false); //현재 음악 진행 여부
    const [liked, setLiked] = useState(false); // 좋아요 상태
    const [likeCount, setLikeCount] = useState(0); // 좋아요 수
    const {setPlaying, audio, setSongInfo} = useContext(PlayerContext); //음악 재생 상태 전역 변수
    const {musicList, setMusicList} = useContext(PlaylistContext);
    const [addedToList, setAddedToList] = useState(false);
    const {isLoggedIn} = useContext(LogingedContext);

    useEffect(() => {
        if (props.songInfo) {
            setSongBoardInfo(props.songInfo);
            setLikeCount(props.songInfo.likeCount || 0);
            setLiked(props.songInfo.isLiked || false);
        }
    }, [props.songInfo])

    useEffect(() => {
        fetchData();
    }, [page, sort]); //page 또는 sort가 변경될 때마다 데이터 다시 불러오기.

    const fetchData = () => {
        if (songBoardInfo && songBoardInfo.songSeq) {
            axios.get(`http://localhost:8080/api/song/detail/${songBoardInfo.songSeq}?nowPage=${page}&sort=${sort}`)
                .then((res) => {
                    setSongBoardInfo(res.data.data);
                    setLikeCount(res.data.data.likeCount || 0);
                    setLiked(res.data.data.isLiked || false);
                })
        }
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handlePageSort = (e) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);
    };

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("클립보드에 링크가 복사되었어요.");
        } catch (err) {
            console.log(err);
        }
    };

    const playMusic = () => {
      if(isLoggedIn){
        console.log(songBoardInfo.soundSourceUrl);
        audio.src = songBoardInfo.soundSourceUrl;
        console.log(audio.src);
        audio.play(); //음악 재생

        setPlaying(true);

        setSongInfo(songBoardInfo);

        if(!addedToList){
          const newSong = {
            songSeq: songBoardInfo.songSeq,
            albumImage: songBoardInfo.albumImage,
            songTitle: songBoardInfo.songTitle,
            singers: songBoardInfo.singers,
            soundSourceUrl: songBoardInfo.soundSourceUrl
          }
          
          // 중복 체크 후 추가
          if (!musicList.some(song => song.soundSourceUrl === newSong.soundSourceUrl)) {
            setMusicList(prevMusicList => [...prevMusicList, newSong]);
          }
        }

        setAddedToList(true);
      }else{
        alert('로그인하고 이용해주세요!');
      }
    }

    const handleLike = () => {
        const token = localStorage.getItem('accessToken');
        const memberId = localStorage.getItem('memberId');
        if (!memberId) {
            alert("로그인이 필요합니다.");
            return;
        }

        const method = liked ? 'DELETE' : 'POST';
        const url = `http://localhost:8080/api/song/${songBoardInfo.songSeq}/like/${memberId}`;


        axios({
            method: method,
            url: url,
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(() => {
                setLiked(!liked);
                setLikeCount(prev => liked ? prev - 1 : prev + 1);
            })
            .catch(err => {
                console.error(err);
                alert("좋아요 기능을 사용할 수 없습니다.");
            });
    };

      
      const songDownload = () => {
        const downloadUrl = `http://localhost:8080/api/song/download/${songBoardInfo.songSeq}`;
        window.location.href = downloadUrl;
      };

      return(
      <div className="songBoard">
          {songBoardInfo &&(
            <div className="songInfoBox">
  
            <div className="songInfo">
  
              <img className="albumImage" src={albumImage} referrerPolicy="no-referrer"/>
              
              <p className="text-1">{songBoardInfo.songTitle}</p>
              <p className="text-2">
                  {songBoardInfo.singers && 
                    songBoardInfo.singers.map((singer, index)=>(
                      <p className="singer" key={singer.songSingerSeq}>
                        {singer.songSingerName}
                        {index !== songBoardInfo.singers.length -1 && ', '}
                      </p>
                    ))}
              </p>
  
              <p className="text-3">앨범</p>
              <Link className="text-4" to={"/album/detail/"+songBoardInfo.albumSeq}>{songBoardInfo.albumTitle}</Link>
  
              <p className="text-5">작사</p>
              <p className="text-6">작곡</p>
              <p className="text-7">{
                lyricistList.map((lyricist, index)=>(
                  //마지막 요소인 경우 쉼표 추가 안한다.
                  <React.Fragment key={lyricist}>
                    {lyricist}
                    {index !== lyricistList.length-1 && ', '}
                  </React.Fragment>
                  ))}</p>
              <p className="text-8">{
                composerList.map((composer,index)=>(
                  <React.Fragment key={composer}>
                    {composer}
                    {index !== composerList.length-1 && ', '}
                  </React.Fragment>
                  ))}</p>
              <p className="text-9">장르</p>
              <p className="text-10">{songBoardInfo.genre}</p>
              <p className="text-11">편곡</p>
              <p className="text-12">{
                arrangerList.map((arranger,index)=>(
                  <React.Fragment key={index}>
                    {arranger}
                    {index !== arrangerList.length-1 && ', '}
                  </React.Fragment>
                  ))}</p>
  
              <button className="button1" onClick={playMusic}>
                <p className="text-13">재생</p>
              </button>

              {/*  */}
              
              
              <button className="button2" onClick={songDownload}>
                <p className="text-16">곡 다운</p>
              </button>


              {/*  */}
              <button className="button3">
                <p className="text-17">담기</p>
              </button>
  
              <p className="text-14" onClick={handleLike}>{liked ? "❤️" : "🤍"} {likeCount}</p>
              <p className="text-15">💿 {songBoardInfo.totalPlayedCount}</p>
              <button className="button4" onClick={()=>handleCopyClipBoard(`http://localhost:5173${location.pathname}`)}>
                  <p className="text-18">공유</p>
              </button>
            </div>
  
            <div className="lyrics">
              <p className="text-18">가사</p>
  
              <p className="text-19">{songBoardInfo.lyrics}</p>
            </div>
  
            <div className="replyCountNumber">
                  <p className="text1">댓글</p>
                  <p className="text2">{replies ? replies.totalElements : 0}</p>
              </div>
  
            <InsertSongreply id={songBoardInfo.songSeq} fetchData={fetchData}/>
  
            <div className="sort">
              <button className="sortRegDate" value={"regDate"} onClick={handlePageSort}>최신순</button>
              <p className="slash">/</p>
              <button className="sortLike" value={"Like"} onClick={handlePageSort}>추천순</button>
            </div>
  
            <div className="songReplyList">
                
                {replies && (
                    replies.content && replies.content.length > 0 ? (
                        <div>
                            {replies.content.map((reply) => (
                                <SongReplyItem key={reply.songReplySeq} reply={reply} songSeq={songBoardInfo.songSeq} fetchData={fetchData}/>
                            ))}
  
                            <div className="paginationBox">
                                <Pagination
                                    activePage={replies.pageable.pageNumber+1}
                                    itemsCountPerPage={5} //한 페이지에 출력할 댓글 수
                                    totalItemsCount={replies.totalElements} //총 댓글 수
                                    prevPageText={"<"}
                                    nextPageText={">"}
                                    pageRangeDisplayed={5} //한번에 표시할 페이지 인덱스 개수
                                    onChange={handlePageChange}
                                >
                                </Pagination>
                            </div>
                        </div>
  
                    ) : (
                        <p className="noReply">아직 작성된 댓글이 없습니다.</p>
                    )
                )}
  
            </div>
  
        </div>
          )}
        </div>
      )
}

export default SongInfo;
