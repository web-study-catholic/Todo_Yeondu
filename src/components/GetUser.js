import axios from 'axios';
import React from 'react'

const GetUser = () => {
  const scope = "nickname, img";
  Kakao.Auth.login({
    scope,
    success : function (response) {
      window.Kakao.Auth.setAccessToken(response.access_token);
      console.log(`is set? : ${window.Kakao.Auth.getAccessToken()}`);

      var ACCESS_TOKEN = window.Kakao.getAccessToken();

      window.Kakao.API.request({
        url: "/v2/user/me",
        success : function ({kakao_account}){
          console.log(kakao_account);
          const {email, profile} = kakao_account;

          console.log(email);
          console.log(`responsed img : ${profile.profile_image_url}`);
          console.log(profile.nickname);

          axios({
            method: "post",
            url : "auth/sns",
            data : {
              "id" : email,
              "nickname" : profile.nickname,
              "image" : profile.profile_image_url,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            alert("카카오 로그인 에러");
          });

        },
        fail : function (error) {
          console.log(error);
        },
      });

    },
    fail : function(error) {
      console.log(error);
    },
  });

  return (
    <div>
      <h3>{nickname ? nickname : ""}</h3>
      <img src={profile_image_url} alt="profile_img" title='img_title' />
    </div>
  )
};

export default GetUser;