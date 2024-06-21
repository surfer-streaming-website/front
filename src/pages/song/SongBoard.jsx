import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongInfo from "../../components/song/SongInfo";
import './SongBoard.css';

const SongBoard = ()=>{
    //파라미터를 받는다.
    const {id}  = useParams();

    const [songBoard, setSongBoard] = useState({});

    useEffect(()=>{
        axios
        .get("http://localhost:8080/api/song/detail/"+id)
        .then((res)=>{
            setSongBoard(res.data.data);
        })
    },[])

    return(
        <div>
            <SongInfo songInfo = {songBoard}/>
        </div>
    );
}

export default SongBoard;