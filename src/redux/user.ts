import { myInfo } from "../api/auth";
import { UserType } from "../type";

type UserState = {
  user: UserType | null;
};

type UserActionType = "OVERRIDE" | "LOGOUT";

export const override = () => ({ type: "OVERRIDE" });
export const logout = () => ({ type: "LOGOUT" });

const initialState: UserState = {
  user: {
    nickname: "asdf",
    email: "a@c.com",
    profileImage: "./images/loopy-profile.jpg",
    postCount: 0,
    followers: 0,
    followings: 0,
  },
};

const user = (
  state = initialState,
  action: {
    type: UserActionType;
    payload?: any;
  }
) => {
  switch (action.type) {
    case "OVERRIDE":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default user;
