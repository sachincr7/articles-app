import { removeTokenCookie } from "../../utils/tools";
import {
  AUTH_USER,
  CHANGE_USER_EMAIL,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  VERIFY_ACCOUNT,
} from "../types";

let initialState = {
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    age: null,
    role: null,
    verify: null,
  },
  auth: null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        auth: action.payload.auth,
      };
    case SIGN_OUT:
      return { ...state, data: { ...initialState.data }, auth: false };
    case CHANGE_USER_EMAIL:
      return { ...state, data: { ...state.data, email: action.payload } };
    case UPDATE_USER_PROFILE:
      return { ...state, data: { ...action.payload } };
    case VERIFY_ACCOUNT:
      return { ...state, data: { ...state.data, verified: true } };
    default:
      return state;
  }
}
