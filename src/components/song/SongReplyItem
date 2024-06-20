import { useContext, useEffect, useState } from "react";
import { LogingedContext } from "../../App";
import axios from "axios";

const SongReplyItem = (props)=>{

    const reply = props.reply;
    const songSeq = props.songSeq;
    const [input, setInput] = useState('');
    const [like, setLike] = useState(false);

    let logingedCon = useContext(LogingedContext);

    useEffect(()=>{
        likeData();
    },[])

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
        }
    }

    const submitReply = (e)=>{
        e.preventDefault();

        console.log("여기까지");

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
    }

    
}

export default SongReplyItem;