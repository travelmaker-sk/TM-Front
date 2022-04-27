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
  // const res = await axios.post(`${baseUrl}/account/join`, params);

  // return res.data;

  // return "registerResult";
  return "";
};

export const registerAuth = async (email: string, authCode: string) => {
  // const res = await axios.post(`${baseUrl}/check-email-token`, {email, authCode});

  // return res.data;

  return true;
};

export const findPw = async (email: string) => {
  // const res = await axios.post(`${baseUrl}/account/findpassword`, email);

  // return res.data;

  return true;
};
