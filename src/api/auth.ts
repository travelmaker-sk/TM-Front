import axios from "axios";

const baseUrl = "https://localhost:8080";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${baseUrl}/login`, {
    email,
    password,
  });

  return response.data.token;
};

export const naverLogin = async (accessToken: string) => {
  const response = await axios.post(`${baseUrl}/naverLogin`, {
    accessToken,
  });

  return response.data.token;
};

export const myInfo = async (token: string | null) => {
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
  const response = await axios.post(`${baseUrl}/account/join`, {
    nickname,
    email,
    password,
  });

  if (response.data.code === 0) return null;

  return response.data;
};

export const registerAuth = async (email: string, authCode: string) => {
  const response = await axios.post(`${baseUrl}/check-email-token`, {
    email,
    authCode,
  });

  return response.data;
};

export const findPw = async (email: string) => {
  const response = await axios.post(`${baseUrl}/findPw`, email);

  return response.data;
};
