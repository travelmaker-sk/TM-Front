import axios from "axios";

// const baseUrl = "https://localhost:3000";
const baseUrl = "https://tm-back-sample.herokuapp.com";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${baseUrl}/user/login`, {
    email,
    password,
  });
  return response.data.token;
};

export const logout = async (token: string) => {
  await axios.get(`${baseUrl}/user/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userInfo = async (token: string) => {
  const response = await axios.get(`${baseUrl}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const register = async (
  nickname: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${baseUrl}/user/register`, {
    nickname,
    email,
    password,
  });
  console.log("#1", response.data);

  if (response.data.code === 0) return null;

  return response.data;
};

export const registerAuth = async (email: string, authCode: string) => {
  const response = await axios.post(`${baseUrl}/emailAuth`, {
    email,
    authCode,
  });

  return response.data;
};

export const findPw = async (email: string) => {
  const response = await axios.post(`${baseUrl}/findPW`, email);

  return response.data;
};
