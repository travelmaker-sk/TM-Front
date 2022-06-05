import axios from "axios";
import { AddPostType, CategoryType, EditPostType } from "../type";

export const addPost = async (data: AddPostType) => {
  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined) return;
    fd.append(key, value);
  });

  const response = await axios.post("/post/new", fd, {
    headers: { "Content-Type": "multipart/from-data" },
  });

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
