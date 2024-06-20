import axios from "axios";

export const logInByRefreshToken = async () => {

  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/auth/sign-in",
      null,
      {
        headers: {
          "Content-Type": "application/json",
          "refresh-token": refreshToken,
        },
      }
    );
    const [, payloadBase64] = res.data.data.accessToken.split(".");
    const decodedPayload = JSON.parse(atob(payloadBase64));
    localStorage.setItem(
      "accessToken",
      "Bearer " + res.data.data.accessToken
    );
    localStorage.setItem("refreshToken", res.data.data.refreshToken);
    localStorage.setItem("nickname", decodedPayload.nickname);
  } catch (err) {
    logOut();
  }
};

export const authExceptionHandler = (error, fetchDataFunction) => {
  if (error.response.data.code === "ACCESS_TOKEN_EXPIRED") {
    logInByRefreshToken();
    fetchDataFunction();
  } else if (error.response.data.code === "INVALID_API_ACCESS_TOKEN") {
    logOut();
  } else {
    alert("권한이 없습니다.");
    window.location.href = "/";
  }
};

const logOut = () => {
  localStorage.clear();
  window.location.assign("/");
};
