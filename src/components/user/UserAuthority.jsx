import React, { useContext, useEffect, useState } from 'react';
import { LogingedContext } from '../../App';
import { authExceptionHandler, logInByRefreshToken } from '../auth/AuthUtil';
import axios from 'axios';

const UserAuthority = () => {

    const [userAuthority , setUserAuthority] = useState();
  
    const logingedCon = useContext(LogingedContext);
  
    useEffect(() => {
      console.log("insert form start");
      fetchData();
      userAuthorityCheck();
    }, []);
  
    const fetchData = () => {
      console.log("insert form");
      if (
        !localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
      ) {
        logInByRefreshToken();
      }
    };
  
    const userAuthorityCheck = () => {
      axios
        .get("http://localhost:8080/api/album/memberStatus", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          setUserAuthority(res.data);
          console.log(res.data);
  
        })
        .catch((err) => {
          if (err.response.status == 401 || err.response.status == 403) {
            authExceptionHandler(err, fetchData);
          } else {
            console.log(err);
          }
        });
    };
  





    return (
        <div>
            
        </div>
    );
};

export default UserAuthority;