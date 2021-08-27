import {
  GET_ARTICLES,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  SITE_LAYOUT,
  GET_ARTICLE,
  CLEAR_CURRENT_ARTICLE,
  ADD_ARTICLE,
  GET_ADMIN_ARTICLES,
  UPDATE_ARTICLE_STATUS,
  REMOVE_ARTICLE,
  CHANGE_USER_EMAIL,
  UPDATE_USER_PROFILE,
  CLEAR_ALL_ARTICLES,
  VERIFY_ACCOUNT,
} from "../types";

//////////////////// articles ///////////////////

export const addArticle = (article) => ({
  type: ADD_ARTICLE,
  payload: article,
});

export const getArticles = (articles) => ({
  type: GET_ARTICLES,
  payload: articles,
});

export const getArticle = (article) => ({
  type: GET_ARTICLE,
  payload: article,
});

export const clearCurrentArticle = (article) => ({
  type: CLEAR_CURRENT_ARTICLE,
  payload: article,
});

export const getPaginateArticle = (articles) => ({
  type: GET_ADMIN_ARTICLES,
  payload: articles,
});

export const updateArticlesStatus = (articles) => ({
  type: UPDATE_ARTICLE_STATUS,
  payload: articles,
});

export const clearArticles = () => ({
  type: CLEAR_ALL_ARTICLES,
});

//////////////////// notificatons //////////////////
export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

export const clearNotification = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_NOTIFICATION });
  };
};

export const removeArticle = () => ({
  type: REMOVE_ARTICLE,
});

/////////////////// Auth //////////////////////////
export const authUser = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const changeUserEmail = (data) => ({
  type: CHANGE_USER_EMAIL,
  payload: data,
});

export const updateUserProfile = (userdata) => ({
  type: UPDATE_USER_PROFILE,
  payload: userdata,
});

export const accountVerify = () => ({
  type: VERIFY_ACCOUNT,
});

/////// site /////////////

export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout,
});
