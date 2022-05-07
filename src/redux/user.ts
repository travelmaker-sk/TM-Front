import { useState } from "react";
import { myInfo } from "../api/auth";
import { UserType } from "../type";

type UserState = {
  user: UserType | null;
};

type UserActionType = "OVERRIDE" | "LOGOUT";

export const override = () => ({ type: "OVERRIDE" });
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
    case "OVERRIDE":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default user;
