import React, { useEffect, useState } from "react";
import Pagination from 'react-js-pagination'
import axios from "axios";
import { useLocation } from "react-router-dom";
import AlbumReplyItem from "./AlbumReplyItem";
import InsertAlbumReply from './InsertAlbumReply';
import SongItem from "../song/SongItem";
import './AlbumInfo.css';
import './SongList.css';
import './AlbumReplyItem.css';

const AlbumInfo = (props) => {
    const [albumBoardInfo, setAlbumBoardInfo] = useState(props.albumInfo || {});
    const replies = albumBoardInfo ? albumBoardInfo.replies : null;
    const songList = albumBoardInfo ? albumBoardInfo.songDtoList : null;
    const [page, setPage] = useState(1); //현재 페이지 번호
    const [sort, setSort] = useState('regDate'); //현재 댓글 정렬 기준
    const albumImage = albumBoardInfo ? albumBoardInfo.albumImage : null;
    const [albumLikeCount, setAlbumLikeCount] = useState(0);

    const location = useLocation();

    let totalPlayedCount = 0; //각 곡 재생횟수의 합
    if (songList) {
        songList.forEach(song => {
            totalPlayedCount += song.totalPlayedCount;
        });
    }

    useEffect(() => {
        if (props.albumInfo) {
            setAlbumBoardInfo(props.albumInfo);
            console.log(props.albumInfo.albumSeq);
            fetchAlbumLikeCount(props.albumInfo.albumSeq);
        }
    }, [props.albumInfo])

    useEffect(() => {
        fetchData();
    }, [page, sort]); //page또는 sort가 변경될 때마다 데이터 다시 불러오기.

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handlePageSort = (e) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);
    };

    const fetchData = () => {
        if (albumBoardInfo && albumBoardInfo.albumSeq) {
            axios.get(`http://localhost:8080/api/album/detail/${albumBoardInfo.albumSeq}?nowPage=${page}&sort=${sort}`)
                .then((res) => {
                    setAlbumBoardInfo(res.data.data);
                    fetchAlbumLikeCount(res.data.data.albumSeq);
                })
        }
    };

    const fetchAlbumLikeCount = async (albumSeq) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/album/${albumSeq}/like-count`);
            setAlbumLikeCount(response.data.data);
        } catch (error) {
            console.error('Failed to fetch album like count:', error);
        }
    };

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("클립보드에 링크가 복사되었어요.");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="albumBoard">
            {albumBoardInfo && (
                <div className="albumInfoBox">
                    <div className="albumInfo">
                        <img className="albumImage" src={albumImage} referrerPolicy="no-referrer" />

                <p className="albumTitle">{albumBoardInfo.albumTitle}</p>
                <p className="albumSinger">
                    {albumBoardInfo.singers && 
                    albumBoardInfo.singers.map((singer, index)=>(
                      <p className="singer" key={singer.albumSingerSeq}>
                        {singer.albumSingerName}
                        {index !== albumBoardInfo.singers.length -1 && ', '}
                      </p>
                    ))}
                </p>
                <p className="text1">발매일</p>
                <p className="releaseDate">{albumBoardInfo.releaseDate}</p>
                <p className="text2">댓글</p>
                <p className="replyCount">{replies ? replies.totalElements : 0}</p>
                <p className="text3">기획사</p>
                <p className="agency">{albumBoardInfo.agency}</p>
                <p className="albumLike">🤍 {albumLikeCount}</p>
                <p className="albumPlayCount">💿 {totalPlayedCount}</p>
                <button className="button1">
                    <p className="playAlbum">전체 재생</p>
                </button>
                <button className="button2">
                    <p className="download">앨범 다운</p>
                </button>
                <button className="button3" onClick={()=>handleCopyClipBoard(`http://localhost:5173${location.pathname}`)}>
                    <p className="share">공유</p>
                </button>

                    </div>

                    <div className="albumContent">
                        <p className="content">{albumBoardInfo.albumContent}</p>
                    </div>


                    <div className="songList">
                        <div className="songs-container">
                            {songList && songList.map((song) => (<SongItem key={song.songSeq} song={song} />))}
                        </div>
                    </div>

                    <div className="replyCountNumber">
                        <p className="text1">댓글</p>
                        <p className="text2">{replies ? replies.totalElements : 0}</p>
                    </div>

                    <InsertAlbumReply id={albumBoardInfo.albumSeq} fetchData={fetchData} />

                    <div className="sort">
                        <button className="sortRegDate" value={"regDate"} onClick={handlePageSort}>최신순</button>
                        <p className="slash">/</p>
                        <button className="sortLike" value={"Like"} onClick={handlePageSort}>추천순</button>
                    </div>

                    <div className="albumReplyList">

                        {replies && (
                            replies.content && replies.content.length > 0 ? (
                                <div>
                                    {replies.content.map((reply) => (
                                        <AlbumReplyItem key={reply.albumReplySeq} reply={reply} albumSeq={albumBoardInfo.albumSeq} fetchData={fetchData} />
                                    ))}

                                    <div className="paginationBox">
                                        <Pagination
                                            activePage={replies.pageable.pageNumber + 1}
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

export default AlbumInfo;
