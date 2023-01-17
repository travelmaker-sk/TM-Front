import axios from "axios";
import popularLocation from "../json/popularLocation.json";

// 포스트 리스트 5개
// 인기 / 최신 / 가볼 만한 곳 / 맛집 / 숙소
export const listPosts = async (location?: string, tag?: string) => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get("/total/api/search", {
    params: { location, tag },
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

// 더보기, 포스트 16개
export const morePosts = async (
  category: string,
  sort: string,
  currentPage: number,
  location?: string,
  tag?: string
) => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get("/total/api/more", {
    params: {
      category,
      sort,
      page: currentPage,
      location,
      tag,
    },
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const loadPost = async (id: number) => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get(`/total/api/detailresponse/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const myPosts = async () => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get("/total/api/mypage", {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const myBookmarks = async () => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get("/total/api/bookmark", {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

export const popularArea = async () => {
  const list = popularLocation.areaList;

  return {
    list,
  };
};
