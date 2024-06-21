import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import { LogingedContext } from "../../App";
import { authExceptionHandler, logInByRefreshToken } from "../auth/AuthUtil";
import './InsertAlbumReply.css';
const InsertAlbumReply = (props)=>{

    let logingedCon = useContext(LogingedContext);
    const [comment, setComment] = useState('');
    const onChange = event => setComment(event.target.value);
    const id = props.id ? props.id : null ;

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = ()=>{
        if (
            !localStorage.getItem("accessToken") &&
            localStorage.getItem("refreshToken")
          ) {
            logInByRefreshToken();
          }
    }

    const submitReply = (e)=>{
        e.preventDefault();
        console.log("여기까지");

        axios({
            method:"POST",
            url: "http://localhost:8080/api/album/"+id+"/reply",
            data: {albumReplyContent: comment},
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
        .then((res)=>{
            props.fetchData();
            setComment('') //댓글 창 초기화
        }
        )
        .catch((err)=>{
            // alert(err.response);
            if(err.response.status == 401 || err.response.status == 403){
                authExceptionHandler(err, fetchData);
            }else{
                console.log(err);
            }
        })
    }

    return(
        
        <div className="replyWriteBox">
            { logingedCon.isLoggedIn ? 
                <div>
                     <form className="replyWriteBox2" onSubmit={submitReply}>
                        <textarea type="text" placeholder="댓글 입력" value={comment} className="replyText" onChange={onChange}/>
                         <button className="replyButton" type="submit">
                             <p className="insertReply">등록</p>
                     </button>
                     </form>
                 </div>
                : 
                (<div className="rectangle">
                    <p className="text">댓글을 작성하려면 `<Link to="/login" className='login'>로그인</Link>` 해주세요.</p>
                </div>)
            }
        </div>
        
    )

}

export default InsertAlbumReply;


