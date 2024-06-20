import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AlbumInfo from "../../components/album/AlbumInfo";

const AlbumBoard = ()=>{

    //파라미터를 받는다.
    const {id}  = useParams();

    const [albumBoard, setAlbumBoard] = useState({});
    
    useEffect(()=>{
        axios
        .get("http://localhost:8080/api/album/detail/"+id)
        .then((res)=>{
            setAlbumBoard(res.data.data);
        });
    },[]);

    return(
        <div>
            <AlbumInfo albumInfo={albumBoard}/>
        </div>
    )
}

export default AlbumBoard;