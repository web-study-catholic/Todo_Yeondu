import axios from 'axios'

export const Kakao = () => {
  const REST_API_KEY = "e68ac4d7c3754e3105d37a231c9f8b9b";
  const REDIRECT_URL = 'http://localhost:3000/oauth';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <div>
      <button onClick={kakaoLogin}>KAKAOLOGIN</button>
    </div>
  )
}