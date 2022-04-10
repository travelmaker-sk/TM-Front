import client from "./client";
import { LoginReqType, RegisterReqType } from "../../types";

// 로그인
export const login = ({ username, password }: LoginReqType) =>
  client.post("/api/auth/login", { username, password });

// 회원가입
export const register = ({ nickname, username, password }: RegisterReqType) =>
  client.post("/api/auth/register", { nickname, username, password });

// 로그인 상태 확인
export const check = () => client.get("/api/auth/check");

// 로그아웃
export const logout = () => client.post("/api/auth/logout");
