import { UserType } from "../lib/type";

interface UserState {
  user: UserType | null;
}

type UserActionType = "SET_USER" | "LOGOUT";

export const setUser = (payload: any) => ({ type: "SET_USER", payload });
export const logout = () => ({ type: "LOGOUT" });

const initialState: UserState = {
  user: {
    username: "김트메",
    email: "tm@a.com",
    profileImage: undefined,
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
    case "SET_USER":
      return { ...state, user: action.payload.user };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default user;
