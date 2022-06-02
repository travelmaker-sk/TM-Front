import axios from "axios";
import { AddPostType } from "../type";

export const addPost = async (data: AddPostType) => {
  const response = await axios.post("/post/new", data);

  // return response.data;
  return false;
};

export const editPost = async (
  id: number,
  category: "place" | "restaurant" | "accomodation",
  title: string,
  location: string,
  date: string,
  score: number,
  weather?: string,
  menu?: string,
  price?: string,
  memo?: string,
  tagList?: Array<string>,
  imageUrl?: string
) => {
  const response = await axios.post(`/post/update/${id}`, {
    category,
    title,
    location,
    date,
    score,
    weather,
    menu,
    price,
    memo,
    tagList,
    imageUrl,
  });

  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await axios.delete(`/post/delete/${id}`);

  return response.data;
};
