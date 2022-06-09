import axios from "axios";
import { AddPostType, EditPostType } from "../type";

// 포토카드 생성
export const addPost = async (data: AddPostType) => {
  let token = localStorage.getItem("tm-token");

  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined) return;
    fd.append(key, value);
  });

  await axios.post("/total/api/detailsave", fd, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// 포토카드 수정tnwjdtnwjd
export const editPost = async (data: EditPostType) => {
  let token = localStorage.getItem("tm-token");

  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined) return;
    fd.append(key, value);
  });

  await axios.post(`/total/api/update/${data.id}`, fd, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// 포토카드 삭제
export const deletePost = async (id: number) => {
  let token = localStorage.getItem("tm-token");

  const response = await axios.get(`/total/api/delete/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};
