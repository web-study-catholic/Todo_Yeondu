import { useEffect, useState } from "react";

const Profile= () => {
  const [user_id, setUserId] = useState();
  const [nickname, setNickname] = useState();
  const [profileImage, setProfileImage] = useState();
  

  const getProfile = async () => {
    try {
      //kakao sdk api
      let data = await window.Kakao.API.request({
        url : "/v2/user/me",
      });
      setUserId(data.id);
      setNickname(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h2>{user_id}</h2>
      <h2>{nickname}</h2>
      <img src={profileImage}></img>
    </div>
  )
}

export default Profile;