import axios from "axios";
import qs from "qs";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export const LoadingStyle = styled.div`
  witdh: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5em;
  span {
    font-size: 24px;
    font-weight: 600;
  }
`;

const KakaoCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const authCode = location.search.substring(1).split("=")[1];

    getAccessToken(authCode)
      .then((accessToken) => {
        // @ts-ignore
        return window.Kakao.API.request({
          url: "/v2/user/me",
        });
      })
      .then((user) => {
        const { id, account_email, profile_username } = user;
        // TODO: 백엔드에 위 필드들을 보내며 로그인 요청
      })
      .then((jwtToken) => {
        // TODO: jwtToken을 저장하고 메인페이지로 redirect
      });
  }, []);

  const getAccessToken = async (authCode: string) => {
    const { REACT_APP_KAKAO_REST_API_KEY, REACT_APP_BASE_URL } = process.env;
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: `${REACT_APP_BASE_URL}/kakaoLogin`,
      code: authCode,
    });

    const res = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      payload
    );

    // access token 설정
    // @ts-ignore
    window.Kakao.Auth.setAccessToken(res.data.access_token);
    return res.data.access_token;
  };

  return (
    <LoadingStyle>
      <span>Loading...</span>
      <br />
      로그인 진행 중입니다. 잠시만 기다려주세요.
    </LoadingStyle>
  );
};

export default KakaoCallback;
