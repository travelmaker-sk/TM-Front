import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { naverLogin } from "../api/auth";
import { useNavigate } from "react-router";
import { LoadingStyle } from "./KaKaoCallback";

const NaverCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = location.hash
      .substring(1)
      .split("&")
      .reduce((acc: Record<string, string>, cur) => {
        const [key, value] = cur.split("=");
        acc[key] = value;
        return acc;
      }, {});

    // API 호출
    naverLogin(query.access_token)
      .then((token) => {
        if (!token) {
          setError("네이버 로그인 실패");
          return;
        } else {
          setError("");
          navigate("/");
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [location, navigate]);

  return (
    <LoadingStyle>
      <span>Loading...</span>
      <br />
      로그인 진행 중입니다. 잠시만 기다려주세요.
    </LoadingStyle>
  );
};

export default NaverCallback;
