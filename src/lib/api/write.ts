import axios from "axios";

export const addPost = async (
  category: string,
  title: string,
  location: string,
  date: string,
  weather?: string,
  menu?: string,
  price?: string,
  score?: string,
  memo?: string,
  tag?: Array<string>,
  filepath?: string
) => {
  const response = await axios.post("/post/new", {
    category,
    title,
    location,
    date,
    weather,
    menu,
    price,
    score,
    memo,
    tag,
    filepath,
  });

  // return response.data;
  return false;
};

export const editPost = async (
  postId: string,
  category: string,
  title: string,
  location: string,
  date: string,
  weather?: string,
  menu?: string,
  price?: string,
  score?: string,
  memo?: string,
  tag?: Array<string>,
  filepath?: string
) => {
  const response = await axios.post("/post/update", {
    params: {
      postId,
    },
    category,
    title,
    location,
    date,
    weather,
    menu,
    price,
    score,
    memo,
    tag,
    filepath,
  });

  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete("/post/delete", {
    params: {
      postId,
    },
  });

  return response.data;
};
