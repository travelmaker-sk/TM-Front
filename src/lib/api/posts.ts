import axios from "axios";

export const postList = async (keywordWhere: string, keywordWhat: string) => {
  const response = await axios.get(
    `/posts?where=${keywordWhere}&what=${keywordWhat}`
  );

  return response.data;
};
