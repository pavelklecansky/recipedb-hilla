import { UserEndpoint } from "Frontend/generated/endpoints";
import {
  AuthState,
  LoginActions,
  LogoutAction,
} from "Frontend/types/security.types";
import { Dispatch } from "react";

export const LOGIN_FETCH = "LOGIN_FETCH";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export function reducer(state: AuthState, action: LoginActions | LogoutAction) {
  switch (action.type) {
    case LOGIN_FETCH:
      return {
        initializing: false,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        initializing: false,
        loading: false,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        initializing: false,
        loading: false,
        error: action.error,
      };
    case LOGOUT:
      return { initializing: false, loading: false };
    default:
      return state;
  }
}

export function createAuthenticateThunk(dispatch: Dispatch<LoginActions>) {
  async function authenticate() {
    dispatch({ type: LOGIN_FETCH });

    // Get user info from endpoint
    const userInfo = await UserEndpoint.getAuthenticatedUser();
    if (userInfo) {
      const user = {
        ...userInfo,
      };

      dispatch({
        user,
        type: LOGIN_SUCCESS,
      });
    } else {
      dispatch({
        error: "Not authenticated",
        type: LOGIN_FAILURE,
      });
    }
  }

  return authenticate;
}

export function createUnauthenticateThunk(dispatch: Dispatch<LogoutAction>) {
  function logout() {
    dispatch({ type: LOGOUT });
  }

  return logout;
}
