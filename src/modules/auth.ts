import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";
import {
  AuthState,
  ChangeFieldReqType,
  LoginReqType,
  RegisterReqType,
} from "../types";

// 액션 타입 정의
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("auth/REGISTER");

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");

// 액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }: ChangeFieldReqType) => ({
    form, // register , login
    key, // nickname, username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  })
);
export const initializeForm = createAction(
  INITIALIZE_FORM,
  (form: "register" | "login") => form
); // register / login
export const register = createAction(
  REGISTER,
  ({ nickname, username, password }: RegisterReqType) => ({
    nickname,
    username,
    password,
  })
);
export const login = createAction(
  LOGIN,
  ({ username, password }: LoginReqType) => ({
    username,
    password,
  })
);

// saga 생성
// 1. 리덕스 사가 미들웨어 설정
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
// 2. 만든 사가 함수를 등록
export function* authSaga() {
  // takeLatest(): 기존에 진행 중이던 작업이 있다면 취소 처리 하고 가장 마지막으로 실행된 작업만 수행.
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

// 초기값
const initialState: AuthState = {
  register: {
    nickname: "",
    username: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

// 리듀서
const auth = handleActions<AuthState, string>(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다.
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default auth;
