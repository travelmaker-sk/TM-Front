import axios from "axios";
import { AddPostType, CategoryType, EditPostType } from "../type";

export const addPost = async (data: AddPostType) => {
  const response = await axios.post("/post/new", data);

  // return response.data;
  return false;
};

export const editPost = async (data: EditPostType) => {
  const response = await axios.post(`/post/update/${data.id}`, data);

  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await axios.delete(`/post/delete/${id}`);

  // return response.data;
  return false;
};
