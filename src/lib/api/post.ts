import axios from "axios";

// 좋아요
export const like = async (id: number) => {
  let token = localStorage.getItem("tm-token");

  console.log("token", token);

  const response = await axios.get(`/total/api/liked/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
  // return false;
};

// 북마크
export const bookmark = async (id: number) => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get(`/total/api/bookmark/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
  // return false;
};
