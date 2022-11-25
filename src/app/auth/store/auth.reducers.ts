import {AuthState} from "./auth.interfaces";
import * as AuthActions from './auth.actions';
import {SET_AUTHENTICATE_SUCCESS, SET_ERROR, SET_LOGIN, SET_SIGN_UP} from "./auth-action-types";


// @ts-ignore
const initialAuthState: AuthState = {
  user: null,
  errors: null,
  loggedIn: false,
  userCreated: false
}

export function authReducers (state = initialAuthState, action: AuthActions.AuthActions) {
   switch (action.type) {

     case SET_LOGIN:
       return {
         ...state,
         user: action.payload,
         loggedIn: true
       }
     case SET_AUTHENTICATE_SUCCESS:
       return {
         ...state,
         user: action.payload
       }
     case SET_ERROR:
       return {
         ...state,
         errors: action.message
       }

     case SET_SIGN_UP:
       return {
         ...state,
         userCreated: action.payload
       }
     default:
       return state
   }
}
