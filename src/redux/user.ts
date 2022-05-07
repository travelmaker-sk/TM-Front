import { useState } from "react";
import { myInfo } from "../api/auth";
import { UserType } from "../type";

type UserState = {
  user: UserType | null;
};

type UserActionType = "SET_USER" | "LOGOUT";

export const setUser = () => ({ type: "SET_USER" });
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
