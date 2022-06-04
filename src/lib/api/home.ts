import axios from "axios";
import popularWhere from "../json/popularWhere.json";

// 인기 여행지 TOP7
export const popularArea = async () => {
  // const response = await axios.get("/popularWhere");

  // return response.data;

  const list = popularWhere.areaList;

  return {
    list,
  };
};
