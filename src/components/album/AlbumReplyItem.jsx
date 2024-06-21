import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LogingedContext } from '../../App';
import { authExceptionHandler, logInByRefreshToken } from "../auth/AuthUtil";

const AlbumReplyItem = (props)=>{

    const reply = props.reply;
    const albumSeq = props.albumSeq;
    const [input, setInput] = useState('');
    const [like, setLike] = useState(false);

    let logingedCon = useContext(LogingedContext);

    useEffect(()=>{
        likeData();
        fetchData();
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
                url: "http://localhost:8080/api/album/"+albumSeq+"/reply/"+reply.albumReplySeq+"/like",
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
                url: "http://localhost:8080/api/album/"+albumSeq+"/reply/"+e.target.value,
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            })
            .then((res)=>{
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
    }

    const updateReply = (e)=>{
        console.log(e.target.value)
        setInput(e.target.value);
    }

    const submitReply = (e)=>{
        e.preventDefault();

        axios({
            method:"PUT",
            url: "http://localhost:8080/api/album/"+albumSeq+"/reply/"+reply.albumReplySeq,
            data: {albumReplyContent: input},
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
        .then((res)=>{
            props.fetchData();
            likeData();
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
            url: "http://localhost:8080/api/album/"+albumSeq+"/reply/"+reply.albumReplySeq+"/like",
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
            url: "http://localhost:8080/api/album/"+albumSeq+"/reply/"+reply.albumReplySeq+"/like",
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

    return(
        <div className="albumReply">
            <p className="nickname">{reply.nickname}</p>
            <p className="replyContent">
                {input ? 
                    <form className="replyUpdateBox" onSubmit={submitReply}> 
                        <textarea className="updateContent" value={input} onChange={onChange}/>
                        <button className="submitUpdate" type="submit">등록</button>
                    </form> : reply.albumReplyContent}
            </p>
            <div className="date">
                {reply.albumReplyCorrect ? reply.albumReplyCordate+"(수정됨)" : reply.albumReplyRegdate}
            </div>

            {   logingedCon.isLoggedIn &&
                <div className="manageReply">
                    <button className="updateReply" onClick={updateReply} value={reply.albumReplyContent}>수정</button>
                    <button className="deleteReply" value={reply.albumReplySeq} onClick={deleteReply}>삭제</button>
                </div>
            }

            { logingedCon.isLoggedIn ?
                <div>{like ? 
                    <div className>
                        <button className="heartButton" onClick={deleteReplyLike}>🤍 {reply.albumReplyLike}</button>
                    </div> 
                    : 
                    <div>
                        <button className="heartButton" onClick={insertReplyLike}>♡ {reply.albumReplyLike}</button>
                    </div>
                }</div>  
                :
                <div className="albumReplyLikeCount">♡ {reply.albumReplyLike}</div>
            }
        </div>
    )

}

export default AlbumReplyItem;