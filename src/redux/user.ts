import { UserType } from "../lib/type";

interface UserState {
  user: UserType | null;
}

type UserActionType = "SET_USER" | "LOGOUT";

export const setUser = (payload: any) => ({ type: "SET_USER", payload });
export const logout = () => ({ type: "LOGOUT" });

const initialState: UserState = {
  user: null,
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
