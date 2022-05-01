import React, { useEffect } from "react";

const NaverLoginPage = () => {
  useEffect(() => {
    // @ts-ignore
    const naver_id_login = new window.naver_id_login(
      "YOUR_CLIENT_ID",
      "YOUR_CALLBACK_URL"
    );
    // 접근 토큰 값 출력
    alert(naver_id_login.oauthParams.access_token);
    // 네이버 사용자 프로필 조회
    naver_id_login.get_naver_userprofile("naverSignInCallback()");
    // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
    function naverSignInCallback() {
      // TODO: API 호출
      alert(naver_id_login.getProfileData("email"));
      alert(naver_id_login.getProfileData("nickname"));
      alert(naver_id_login.getProfileData("age"));
    }
  }, []);
  return <div>Loading...</div>;
};

export default NaverLoginPage;
