import { useContext, useEffect, useState } from "react";
import axios from "axios";
import './SongReplyItem.css';
import { LogingedContext } from "../../../App";
import { authExceptionHandler, logInByRefreshToken } from "../../auth/AuthUtil";

const SongReplyItem = (props)=>{

    const reply = props.reply;
    const songSeq = props.songSeq;
    const [input, setInput] = useState('');
    const [like, setLike] = useState(false);

    let logingedCon = useContext(LogingedContext);

    useEffect(()=>{
        likeData();
        fetchData();
        //console.log(reply);
    },[])

    const fetchData = ()=>{
        if (
            !localStorage.getItem("accessToken") &&
            localStorage.getItem("refreshToken")
          ){
            logInByRefreshToken();
          }
    }

    const likeData = ()=>{
        if(logingedCon.isLoggedIn){
            axios({
                method:"GET",
                url: "http://localhost:8080/api/song/"+songSeq+"/reply/"+reply.songReplySeq+"/like",
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            })
            .then((res)=>{
                setLike(res.data.data);
            })
            .catch((err)=>{
                if (err.response.status === 401 || err.response.status === 403) {
                    authExceptionHandler(err, fetchData);
                  } else {
                    console.log(err);
                  }
            })
        }
    }

    const onChange = e => setInput(e.target.value);

    const deleteReply = (e)=>{
        if(confirm("댓글을 정말 삭제하시겠습니까?")){
            axios({
                method:"DELETE",
                url: "http://localhost:8080/api/song/"+songSeq+"/reply/"+e.target.value,
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            })
            .then((res)=>{
                props.fetchData();
            })
            .catch((err)=>{
                if (err.response.status === 401 || err.response.status === 403) {
                    authExceptionHandler(err, fetchData);
                  } else {
                    console.log(err);
                  }
            })
        }
    }

    const updateReply = (e)=>{
        console.log(e.target.value)
        setInput(e.target.value);
    }

    const submitReply = (e)=>{
        e.preventDefault();

        //console.log("여기까지");

        axios({
            method:"PUT",
            url: "http://localhost:8080/api/song/"+songSeq+"/reply/"+reply.songReplySeq,
            data: {songReplyContent: input},
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
        .then((res)=>{
            props.fetchData();
            setInput('');
        })
        .catch((err)=>{
            if (err.response.status === 401 || err.response.status === 403) {
                authExceptionHandler(err, fetchData);
              } else {
                console.log(err);
              }
        })
    }

    const insertReplyLike = ()=>{
        axios({
            method:"PUT",
            url: "http://localhost:8080/api/song/"+songSeq+"/reply/"+reply.songReplySeq+"/like",
            headers:{
                Authorization: localStorage.getItem("accessToken")
            }
        })
        .then((res)=>{
            setLike(!like);
            props.fetchData();
            likeData();
        })
        .catch((err)=>{
            if (err.response.status === 401 || err.response.status === 403) {
                authExceptionHandler(err, fetchData);
              } else {
                console.log(err);
              }
        })
    }

    const deleteReplyLike = ()=>{
        axios({
            method:"DELETE",
            url: "http://localhost:8080/api/song/"+songSeq+"/reply/"+reply.songReplySeq+"/like",
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
        .then((res)=>{
            setLike(!like);
            props.fetchData();
            likeData();
        })
        .catch((err)=>{
            if (err.response.status === 401 || err.response.status === 403) {
                authExceptionHandler(err, fetchData);
              } else {
                console.log(err);
              }
        })
    }

    //console.log(reply.songReplyCorrect);

    return(
        <div className="songReply">
            <p className="nickname">{reply.nickname}</p>
            <p className="replyContent">
                {input ? 
                    <form className="replyUpdateBox" onSubmit={submitReply}> 
                        <textarea className="updateContent" value={input} onChange={onChange}/>
                        <button className="submitUpdate" type="submit">등록</button>
                    </form> : reply.songReplyContent}
            </p>
            <div className="date">
                {reply.songReplyCorrect ? reply.songReplyCordate+"(수정됨)" : reply.songReplyRegDate}
            </div>

            {   logingedCon.isLoggedIn &&
                <div className="manageReply">
                    <button className="updateReply" onClick={updateReply} value={reply.songReplyContent}>수정</button>
                    <button className="deleteReply" value={reply.songReplySeq} onClick={deleteReply}>삭제</button>
                </div>
            }

            { logingedCon.isLoggedIn ?
                <div>{like ? 
                    <div className>
                        <button className="heartButton" onClick={deleteReplyLike}>🤍 {reply.songReplyLike}</button>
                    </div> 
                    : 
                    <div>
                        <button className="heartButton" onClick={insertReplyLike}>♡ {reply.songReplyLike}</button>
                    </div>
                }</div>  
                :
                <div className="songReplyLikeCount">♡ {reply.songReplyLike}</div>
            }
        </div>
    )
    
}

export default SongReplyItem;