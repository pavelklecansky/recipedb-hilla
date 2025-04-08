import Role from "Frontend/generated/cz/klecansky/recipedb/user/io/Role";
import User from "Frontend/generated/cz/klecansky/recipedb/user/io/User";
import {
  LOGIN_FAILURE,
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGOUT,
} from "Frontend/utils/security.utils";

export type AccessProps = Readonly<{
  requiresLogin?: boolean;
  rolesAllowed?: readonly Role[];
}>;

export type Authentication = Readonly<{
  state: AuthState;
  authenticate: AuthenticateThunk;
  unauthenticate: UnauthenticateThunk;
  hasAccess: ({ handle }: { handle?: AccessProps }) => boolean;
}>;

export type AuthUser = User;

export type AuthState = Readonly<{
  initializing: boolean;
  loading: boolean;
  user?: AuthUser;
  error?: string;
}>;

export type LoginFetchAction = Readonly<{
  type: typeof LOGIN_FETCH;
}>;

export type LoginSuccessAction = Readonly<{
  user: AuthUser;
  type: typeof LOGIN_SUCCESS;
}>;

export type LoginFailureAction = Readonly<{
  error: string;
  type: typeof LOGIN_FAILURE;
}>;

export type LoginActions =
  | LoginFetchAction
  | LoginSuccessAction
  | LoginFailureAction;

export type LogoutAction = Readonly<{
  type: typeof LOGOUT;
}>;

export type AuthenticateThunk = () => Promise<void>;
export type UnauthenticateThunk = () => void;
