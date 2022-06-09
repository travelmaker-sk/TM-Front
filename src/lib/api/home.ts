import axios from "axios";
import popularLocation from "../json/popularLocation.json";
import postsData from "../json/posts.json";
import mypostsData from "../json/myposts.json";

// 포스트 리스트 5개
// 인기 / 최신 / 가볼 만한 곳 / 맛집 / 숙소
export const listPosts = async (location?: string, tag?: string) => {
  console.log("listPost");
  let token = localStorage.getItem("tm-token");

  // const params: Record<string, any> = {};

  // if (location) params.location = location;
  // if (tag) params.tag = tag;

  const response = await axios.get("/total/api/search", {
    params: { location, tag },
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;

  // const popularList = postsData.postList
  //   .sort((a, b) => a.like.likeNum - b.like.likeNum)
  //   .slice(0, 4);
  // const recentList = postsData.postList
  //   .sort((a, b) => (a.date <= b.date ? -1 : 1))
  //   .slice(0, 4);
  // const placeList = postsData.postList
  //   .filter((post) => post.category === "place")
  //   .slice(0, 4);
  // const restList = postsData.postList
  //   .filter((post) => post.category === "store")
  //   .slice(0, 4);
  // const accomList = postsData.postList
  //   .filter((post) => post.category === "lodging")
  //   .slice(0, 4);

  // return {
  //   popular: popularList,
  //   recent: recentList,
  //   place: placeList,
  //   store: restList,
  //   lodging: accomList,
  // };
};

// 더보기, 포스트 16개
export const morePosts = async (
  category: string,
  sort: string,
  currentPage: number,
  location?: string,
  tag?: string
) => {
  console.log("morePosts");
  let token = localStorage.getItem("tm-token");

  // const params: Record<string, any> = {
  //   category,
  //   sort,
  //   page: currentPage,
  // };

  // if (location) params.location = location;
  // if (tag) params.tag = tag;

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

  // let result: any[] = [];
  // switch (category) {
  //   case "popular":
  //     result = postsData.postList
  //       .sort((a, b) => a.like.likeNum - b.like.likeNum)
  //       .slice(0, 16);
  //     break;
  //   case "recent":
  //     result = postsData.postList
  //       .sort((a, b) => (a.date <= b.date ? -1 : 1))
  //       .slice(0, 16);
  //     break;
  //   case "place":
  //     result = postsData.postList
  //       .filter((post) => post.category === "place")
  //       .slice(0, 16);
  //     break;
  //   case "store":
  //     result = postsData.postList
  //       .filter((post) => post.category === "store")
  //       .slice(0, 16);
  //     break;
  //   case "lodging":
  //     result = postsData.postList
  //       .filter((post) => post.category === "lodging")
  //       .slice(0, 16);
  //     break;
  // }

  // return {
  //   totalCount: 30,
  //   list: result,
  // };
};

// 개별 포스트
export const loadPost = async (id: number) => {
  console.log("loadPost");
  let token = localStorage.getItem("tm-token");

  const response = await axios.get(`/total/api/detailresponse/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};

// 마이페이지 포스트
export const myPosts = async () => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get("/myPosts", {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;

  // const list = mypostsData.postList;

  // return {
  //   list,
  // };
};

// 북마크 페이지 포스트
export const myBookmarks = async () => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get("/myBookmarks", {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;

  // const list = mypostsData.postList;

  // return {
  //   list,
  // };
};

// 인기 여행지 TOP7
export const popularArea = async () => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get("/popularLocation", {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;

  // const list = popularLocation.areaList;

  // return {
  //   list,
  // };
};
