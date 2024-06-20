import { useContext, useState } from "react";
import { LogingedContext } from '../../App';
import axios from "axios";
import { Link } from "react-router-dom";

const InsertSongreply = (props) =>{

    let logingedCon = useContext(LogingedContext);
    const [comment, setComment] = useState('');
    const onChange = event => setComment(event.target.value);
    const id = props.id ? props.id : null ;

    const submitReply = (e)=>{
        e.preventDefault();

        axios({
            method:"POST",
            url: "http://localhost:8080/api/song/"+id+"/reply",
            data: {songReplyContent: comment},
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
            alert(err.response);
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

export default InsertSongreply;