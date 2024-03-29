import axios from "axios";

export const login = async (username: string, password: string) => {
  const response = await axios.post("/login", {
    username,
    password,
  });

  let jwtToken = response.headers.authorization;

  localStorage.setItem("tm-token", jwtToken);

  return response.data;
};

export const naverLogin = async (accessToken: string) => {
  const response = await axios.post("/naverLogin", {
    accessToken,
  });

  return response.data.token;
};

export const userInfo = async () => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get("/account/mypage", {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const quit = async () => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.delete("/account/delete", {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await axios.post("/account/join", {
    username,
    email,
    password,
  });

  if (response.data.code === 0) return null;

  return response.data;
};

export const registerAuth = async (email: string, authToken: string) => {
  const response = await axios.post("/check-email-token", {
    email,
    authToken,
  });

  return response.data;
};

export const findPw = async (email: string) => {
  const response = await axios.post("/account/findpassword", { email });

  return response.data;
};
