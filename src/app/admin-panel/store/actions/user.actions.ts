import { createAction, props } from '@ngrx/store';
import {UserInterface} from "../interfaces/user.interfaces";


export enum UserActionsTypes {
  GET_USERS = '[User] GET_USERS',
  SET_USERS = '[User] SET_USERS',
  GET_USER = '[User] GET_USER',
  SET_USER = '[User] SET_USER',
  GET_UP_USER_STATE = '[User] GET_UP_USER_STATE',
  SET_UP_USER_STATE = '[User] SET_UP_USER_STATE',
  GET_UP_GENERAL_USER_STATE = '[User] GET_UP_GENERAL_USER_STATE',
  SET_UP_GENERAL_USER_STATE = '[User] SET_UP_GENERAL_USER_STATE',
  GET_UP_BEAUTICIAN_USER_STATE = '[User] GET_UP_BEAUTICIAN_USER_STATE',
  SET_UP_BEAUTICIAN_USER_STATE = '[User] SET_UP_BEAUTICIAN_USER_STATE',
  GET_COUNT_USERS = '[User] GET_COUNT_USERS',
  SET_COUNT_USERS = '[User] SET_COUNT_USERS',
  GET_COUNT_GENERAL_USERS = '[User] GET_COUNT_GENERAL_USERS',
  SET_COUNT_GENERAL_USERS = '[User] SET_COUNT_GENERAL_USERS',
  GET_COUNT_BEAUTICIAN_USERS = '[User] GET_COUNT_BEAUTICIAN_USERS',
  SET_COUNT_BEAUTICIAN_USERS = '[User] SET_COUNT_BEAUTICIAN_USERS',
  GET_GENERAL_USERS = '[User] GET_GENERAL_USERS',
  SET_GENERAL_USERS = '[User] SET_GENERAL_USERS',
  GET_BEAUTICIAN_USERS = '[User] GET_BEAUTICIAN_USERS',
  SET_BEAUTICIAN_USERS = '[User] SET_BEAUTICIAN_USERS',
  GET_THERAPISTS_USERS = '[User] GET_THERAPISTS_USERS',
  SET_THERAPISTS_USERS = '[User] SET_THERAPISTS_USERS',
  GET_SEARCH_USERS = '[User] GET_SEARCH_USERS',
  SET_SEARCH_USERS = '[User] SET_SEARCH_USERS',
  GET_CLEAR_LOADED_USER = '[User] GET_CLEAR_LOADED_USER',
  GET_LOGGED_IN_USER_INFO = '[User] GET_LOGGED_IN_USER_INFO',
  SET_LOGGED_IN_USER_INFO = '[User] SET_LOGGED_IN_USER_INFO',
}


export const getLoggedInUserInfo = createAction(
  UserActionsTypes.GET_LOGGED_IN_USER_INFO
)
export const setLoggedInUserInfo = createAction(
  UserActionsTypes.SET_LOGGED_IN_USER_INFO,
  props<{user: UserInterface}>()
)

export const getClearLoadedUser = createAction(
  UserActionsTypes.GET_CLEAR_LOADED_USER
)

export const getSearchUsers = createAction(
  UserActionsTypes.GET_SEARCH_USERS,
  props<{keyword: string; page: number; size: number;}>()
)

export const setSearchUsers = createAction(
  UserActionsTypes.SET_SEARCH_USERS,
  props<{users: UserInterface[]}>()
)

export const getUpdateBeauticianUserState = createAction(
  UserActionsTypes.GET_UP_BEAUTICIAN_USER_STATE,
  props<{id: string; state: string; }>()
)

export const setUpdateBeauticianUserState = createAction(
  UserActionsTypes.SET_UP_BEAUTICIAN_USER_STATE,
  props<{user: UserInterface}>()
)

export const getUpdateGeneralUserState = createAction(
  UserActionsTypes.GET_UP_GENERAL_USER_STATE,
  props<{id: string; state: string; }>()
)

export const setUpdateGeneralUserState = createAction(
  UserActionsTypes.SET_UP_GENERAL_USER_STATE,
  props<{user: UserInterface}>()
)

export const getUpdateUserState = createAction(
  UserActionsTypes.GET_UP_USER_STATE,
  props<{id: string; state: string; }>()
)

export const setUpdateUserState = createAction(
  UserActionsTypes.SET_UP_USER_STATE,
  props<{user: UserInterface}>()
)

export const getCountUsers = createAction(
  UserActionsTypes.GET_COUNT_USERS,
);
export const setCountUsers = createAction(
  UserActionsTypes.SET_COUNT_USERS,
  props<{ count: number; }>()
);


export const getCountGeneralUsers = createAction(
  UserActionsTypes.GET_COUNT_GENERAL_USERS,
);
export const setCountGeneralUsers = createAction(
  UserActionsTypes.SET_COUNT_GENERAL_USERS,
  props<{ count: number; }>()
);

export const getCountBeauticianUsers = createAction(
  UserActionsTypes.GET_COUNT_BEAUTICIAN_USERS,
);
export const setCountBeauticianUsers = createAction(
  UserActionsTypes.SET_COUNT_BEAUTICIAN_USERS,
  props<{ count: number; }>()
);

export const getUser = createAction(
  UserActionsTypes.GET_USER,
  props<{ id: string }>()
);
export const setUser = createAction(
  UserActionsTypes.SET_USER,
  props<{ user: UserInterface; }>()
);

export const getUsers = createAction(
  UserActionsTypes.GET_USERS,
  props<{ page: number; size: number; }>()
);
export const setUsers = createAction(
  UserActionsTypes.SET_USERS,
  props<{ users: UserInterface[]; }>()
);

export const getGeneralUsers = createAction(
  UserActionsTypes.GET_GENERAL_USERS,
  props<{ page: number; size: number; }>()
);
export const setGeneralUsers = createAction(
  UserActionsTypes.SET_GENERAL_USERS,
  props<{ users: any; }>()
);

export const getBeauticianUsers = createAction(
  UserActionsTypes.GET_BEAUTICIAN_USERS,
  props<{ page: number; size: number; }>()
);
export const setBeauticianUsers = createAction(
  UserActionsTypes.SET_BEAUTICIAN_USERS,
  props<{ users: any; }>()
);

export const getTherapistsUsers = createAction(
  UserActionsTypes.GET_THERAPISTS_USERS,
  props<{ page: number; size: number; }>()
);
export const setTherapistsUsers = createAction(
  UserActionsTypes.SET_THERAPISTS_USERS,
  props<{ users: any; }>()
);
