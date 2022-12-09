import axios from "axios";
import { AddPostType, EditPostType } from "../type";

// 포토카드 생성
export const addPost = async (data: AddPostType) => {
  console.log("addPost");
  let token = localStorage.getItem("tm-token");

  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined) return;
    fd.append(key, value);
  });

  const response = await axios.post("/total/api/detailsave", fd, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 포토카드 수정
export const editPost = async (data: EditPostType) => {
  console.log("editPost");
  let token = localStorage.getItem("tm-token");

  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined) return;
    fd.append(key, value);
  });

  const response = await axios.post(`/total/api/update/${data.id}`, fd, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 포토카드 삭제
export const deletePost = async (id: number) => {
  console.log("deletePost");
  let token = localStorage.getItem("tm-token");

  const response = await axios.get(`/total/api/delete/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};
