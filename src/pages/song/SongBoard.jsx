import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongInfo from "../../components/song/SongInfo";
import './SongBoard.css';

const SongBoard = ()=>{
    const accessToken = localStorage.getItem("accessToken");
    let decodedPayload;
    if(localStorage.getItem("accessToken")){
        const [, payloadBase64] = accessToken.split(" ")[1].split(".");
        decodedPayload = JSON.parse(atob(payloadBase64));
    } else{
        decodedPayload = null;
    }
    //파라미터를 받는다.
    const {id}  = useParams();

    const [songBoard, setSongBoard] = useState({});

    useEffect(()=>{
        if(decodedPayload){
            axios
            .get("http://localhost:8080/api/song/detail/" + id, {
                headers: {
                  Authorization: decodedPayload.user
                }
              })
              .then((res) => {
                setSongBoard(res.data.data);
              })
        }else{
            axios
            .get("http://localhost:8080/api/song/detail/" + id)
              .then((res) => {
                setSongBoard(res.data.data);
              })
        }
        
    },[])

    return(
        <div>
            <SongInfo songInfo = {songBoard}/>
        </div>
    );
}

export default SongBoard;