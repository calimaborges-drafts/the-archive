import * as t from "../types";
import { router } from "../../factory";
import * as api from "../../api";
import { requestFailed } from "./request-actions";
import { addAlert } from "./alert-actions";

export const authenticate = (username, password) => async dispatch => {
  dispatch({
    type: t.AUTHENTICATE
  });

  try {
    dispatch({
      type: t.AUTHENTICATION_SUCCESS,
      session: await api.session(username, password)
    });
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const logout = () => {
  api.logout();
  return {
    type: t.LOGOUT
  };
};

export const signUp = (
  username,
  password,
  passwordConfirmation
) => async dispatch => {
  dispatch({
    type: t.SIGNUP
  });

  if (passwordConfirmation !== password) {
    dispatch(requestFailed(new Error("Confirmação de senha não confere")));
  } else {
    try {
      await api.postUser({ username, password });

      dispatch({
        type: t.SIGNUP_SUCCESS
      });

      dispatch(
        addAlert(
          "success",
          "Cadastrado!",
          "Usuário foi cadastrado com sucesso!"
        )
      );

      router.goto("/");
    } catch (error) {
      dispatch(requestFailed(error));
    }
  }
};
