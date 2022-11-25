import {Action} from "@ngrx/store";
import {GET_LOGIN, GET_SIGN_UP, SET_AUTHENTICATE_SUCCESS, SET_ERROR, SET_LOGIN, SET_SIGN_UP} from "./auth-action-types";
import {LoginResponse, LoginState, SignUpState} from "./auth.interfaces";
import {UserInterface} from "../../admin-panel/store/interfaces/user.interfaces";

export class GetUserSignUp implements Action {
  readonly type = GET_SIGN_UP;
  constructor(public payload: SignUpState) {
  }
}

export class SetUserSignUp implements Action {
  readonly type = SET_SIGN_UP;
  constructor(public payload: boolean) {
  }
}

export class GetLogin implements Action {
  readonly type = GET_LOGIN;
  constructor(public payload: LoginState) {
  }
}

export class SetLogin implements Action {
  readonly type = SET_LOGIN;
  constructor(public payload: LoginResponse) {
  }
}

export class SetAuthenticateSuccess implements Action {
  readonly type = SET_AUTHENTICATE_SUCCESS;
  constructor(public payload: LoginResponse) {
  }
}

export class Errors implements Action {
  readonly type = SET_ERROR;
  constructor(public message: string) {
  }
}


// Export class as a type
export type AuthActions = GetLogin | SetLogin | Errors | SetAuthenticateSuccess | GetUserSignUp | SetUserSignUp;
