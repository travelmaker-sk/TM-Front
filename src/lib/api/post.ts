import axios from "axios";
import postsData from "../json/posts.json";
import mypostsData from "../json/myposts.json";

// 전체 포스트
// 인기 / 최신 / 가볼 만한 곳 / 맛집 / 숙소
export const listPosts = async (where?: string, what?: string) => {
  // const response = await axios.get("/search", {
  //   params: {
  //     where,
  //     what,
  //   },
  // });

  // return response.data;

  const popularList = postsData.postList
    .sort((a, b) => a.like.likeNum - b.like.likeNum)
    .slice(0, 4);
  const recentList = postsData.postList
    .sort((a, b) => (a.date <= b.date ? -1 : 1))
    .slice(0, 4);
  const placeList = postsData.postList
    .filter((post) => post.category === "place")
    .slice(0, 4);
  const restList = postsData.postList
    .filter((post) => post.category === "restaurant")
    .slice(0, 4);
  const accomList = postsData.postList
    .filter((post) => post.category === "accommodation")
    .slice(0, 4);

  return {
    popular: popularList,
    recent: recentList,
    place: placeList,
    restaurant: restList,
    accommodation: accomList,
  };
};

// 더보기 포스트
export const morePosts = async (
  category: string,
  sort: string,
  currentPage: number,
  where?: string,
  what?: string
) => {
  // const response = await axios.get("/datailPosts", {
  //   params: {
  //     where,
  //     what,
  //     category,
  //     sort,
  //     page: currentPage,
  //   },
  // });

  // return response.data;

  let result: any[] = [];
  switch (category) {
    case "popular":
      result = postsData.postList
        .sort((a, b) => a.like.likeNum - b.like.likeNum)
        .slice(0, 16);
      break;
    case "recent":
      result = postsData.postList
        .sort((a, b) => (a.date <= b.date ? -1 : 1))
        .slice(0, 16);
      break;
    case "place":
      result = postsData.postList
        .filter((post) => post.category === "place")
        .slice(0, 16);
      break;
    case "restaurant":
      result = postsData.postList
        .filter((post) => post.category === "restaurant")
        .slice(0, 16);
      break;
    case "accommodation":
      result = postsData.postList
        .filter((post) => post.category === "accommodation")
        .slice(0, 16);
      break;
  }

  return {
    totalCount: 30,
    list: result,
  };
};

// 마이페이지 포스트
export const myPosts = async () => {
  // const response = await axios.get("/myPosts");

  // return response.data;

  const list = mypostsData.postList;

  return {
    list,
  };
};

// 좋아요
export const addLike = async (id: number) => {
  const response = await axios.post(`/like/add/${id}`);

  return response.data;
};
export const delLike = async (id: number) => {
  const response = await axios.delete(`/like/delete/${id}`);

  return response.data;
};

// 북마크
export const addBookmark = async (id: number) => {
  const response = await axios.post(`/bookmark/add/${id}`);

  // return response.data;
  return true;
};
export const delBookmark = async (id: number) => {
  const response = await axios.delete(`/bookmark/delete/${id}`);

  // return response.data;
  return true;
};
