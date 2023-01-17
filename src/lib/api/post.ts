import axios from "axios";

export const like = async (id: number) => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get(`/total/api/liked/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const bookmark = async (id: number) => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get(`/total/api/bookmark/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};
