import { AccomCardType, PlaceCardType, RestCardType } from "../lib/type";

export interface PostsType {
  posts: PlaceCardType[] | RestCardType[] | AccomCardType[] | null;
}

type PostsActionType = "GET_POSTS";

export const getPosts = (payload: any) => ({ type: "GET_POSTS", payload });

const initialState: PostsType = {
  posts: [
    {
      id: 0,
      title: "성산일출봉",
      location: "제주특별자치도 서귀포시 성산읍 일출로 284-12",
      memo: "아무나 잡고 사진 찍어 그건 니 인생샷~",
      tag: ["제주도", "성산일출봉", "성산", "일출", "일몰"],
      filename: "",
      filepath: "",
      score: 4.5,
      date: "2022-05-18T09:41:17.295+00:00",
      liked: 20,
      writer: {
        username: "김트메",
        profileImage: "",
      },
      category: "place",
      weather: "맑음",
    },
  ],
};

const posts = (
  state = initialState,
  action: {
    type: PostsActionType;
    payload?: any;
  }
) => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload.posts };
    default:
      return state;
  }
};

export default posts;
