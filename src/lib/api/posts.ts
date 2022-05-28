import axios from "axios";
import postsData from "../../lib/json/posts.json";

// 전체 포스트 페이지
// 인기 / 최신 / 가볼 만한 곳 / 맛집 / 숙소
export const allPosts = async (
  limit: number,
  keywordWhere?: string,
  keywordWhat?: string
) => {
  // const response = await axios.get("/allPosts", {
  //   params: {
  //     limit,
  //     where: keywordWhere,
  //     what: keywordWhat,
  //   },
  // });

  // return response.data;

  const popularList = postsData.postList
    .sort((a, b) => a.liked - b.liked)
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

// 더보기 포스트 페이지
export const detailPosts = async (
  from: number,
  limit: number,
  category: "popular" | "recent" | "place" | "restaurant" | "accommodation",
  sort: "new" | "old" | "popular" = "new",
  keywordWhere?: string,
  keywordWhat?: string
) => {
  // const response = await axios.get("/datailPosts", {
  //   params: {
  //     from,
  //     limit,
  //     sort,
  //     where: keywordWhere,
  //     what: keywordWhat,
  //   },
  // });

  // return response.data;

  let result: any[] = [];
  switch (category) {
    case "popular":
      result = postsData.postList
        .sort((a, b) => a.liked - b.liked)
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

// 좋아요
export const patchLike = async (postId: number) => {
  const response = await axios.get("/like");

  // return response.data;
  return false;
};
export const addLike = async (postId: number) => {
  const response = await axios.post("/like", {
    postId,
  });

  return response.data;
};
export const delLike = async (postId: number) => {
  const response = await axios.delete("/like");

  return response.data;
};

// 북마크
export const checkBookmark = async (postId: number) => {
  const response = await axios.get("/bookmark");

  return response.data;
};
export const addBookmark = async (postId: number) => {
  const response = await axios.post("/bookmark", {
    postId,
  });

  return response.data;
};
export const delBookmark = async (postId: number) => {
  const response = await axios.delete("/bookmark");

  return response.data;
};
