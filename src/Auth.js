import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import qs from 'qs';

const Auth = () => {
  const REST_API_KEY = "e68ac4d7c3754e3105d37a231c9f8b9b";
  const REDIRECT_URL = 'http://localhost:3000/oauth';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type : 'authorization_code',
      client_id : REST_API_KEY,
      redirect_url : REDIRECT_URL,
      code : code,
    });
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      //자바 스크립트 SDK 초기화
      //window.Kakao.init(REST_API_KEY);
      //access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      navigate("/profile", {replace: true});
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  },[]);

  return null;
};

export default Auth;