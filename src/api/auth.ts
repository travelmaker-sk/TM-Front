import axios from "axios";

// const baseUrl = "http://localhost:8080";

export const login = async (username: string, password: string) => {
  const response = await axios.post("/login", {
    username,
    password,
  });

  // @ts-ignore
  let jwtToken = response.headers.get("Authorization");
  localStorage.setItem("Authorization", jwtToken);

  return response.data;
};

export const naverLogin = async (accessToken: string) => {
  const response = await axios.post("/naverLogin", {
    accessToken,
  });

  return response.data.token;
};

export const myInfo = async (token: string | null) => {
  const response = await axios.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
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

export const registerAuth = async (email: string, token: string) => {
  const response = await axios.post("/check-email-token", {
    email,
    token,
  });

  return response.data;
};

export const findPw = async (email: string) => {
  const response = await axios.post("/account/findpassword", email);

  return response.data;
};
