import axios from "axios";

interface ILoginParams {
  email: string;
  password: string;
}

interface IRegisterParams {
  nickname: string;
  email: string;
  password: string;
}

const baseUrl = "https://localhost:8080";

export const login = async (params: ILoginParams): Promise<string | null> => {
  // const res = await axios.post(`${baseUrl}/login`, params);

  // const response = res.data;
  // return response.token;

  return "sampleToken";
};

export const register = async (
  params: IRegisterParams
): Promise<string | null> => {
  // const res = await axios.post(`${baseUrl}/register`, params);

  // return res.data;

  return "registerResult";
};

export const registerAuth = async (authCode: string) => {
  // const res = await axios.post(`${baseUrl}/emailVerification`, authCode);

  // return res.token;

  return true;
};

export const findPw = async (email: string) => {
  // const res = await axios.post(`${baseUrl}/findPassword`, email);

  // return res.data;

  return true;
};
