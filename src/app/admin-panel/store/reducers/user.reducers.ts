import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {UserInterface} from "../interfaces/user.interfaces";
import {
  getClearLoadedUser,
  setBeauticianUsers, setCountBeauticianUsers, setCountGeneralUsers, setCountUsers,
  setGeneralUsers, setLoggedInUserInfo, setSearchUsers,
  setTherapistsUsers, setUpdateBeauticianUserState, setUpdateGeneralUserState,
  setUpdateUserState, setUser,
  setUsers
} from "../actions/user.actions";

// Main State of the user page
export interface UserState extends EntityState<UserInterface> {
  errors: any;
  loggedInUser: UserInterface,
  usersLoaded: boolean;
  generalUsers: UserInterface[];
  generalUsersLoaded: boolean;
  beauticianUsers: UserInterface[];
  beauticianUsersLoaded: boolean;
  therapistsUsers: UserInterface[];
  user: UserInterface;
  totalCount: number;
  totalCountGeneral: number;
  totalCountBeautician: number;
}

// Entity Adapter for the user page
export const userAdapter = createEntityAdapter<UserInterface>( {
  selectId: ( entity: UserInterface ) => entity._id,
} );

// initial state of the user page
const initialState = userAdapter.getInitialState( {
  errors: null,
  loggedInUser: null,
  usersLoaded: false,
  generalUsers: null,
  generalUsersLoaded: false,
  beauticianUsers: null,
  beauticianUsersLoaded: false,
  therapistsUsers: null,
  user: null,
  totalCount: 0,
  totalCountGeneral: 0,
  totalCountBeautician: 0
} );


// Reducer for the user page
// @ts-ignore
export const userReducers = createReducer (
  initialState,

  // @ts-ignore
  on(setLoggedInUserInfo, (state, action) => {
    return {
      ...state,
      loggedInUser: action.user
    }
  }),

  on(setCountBeauticianUsers, (state, action) => {
    return {
      ...state,
      totalCountBeautician: action.count
    }
  }),

  on(setCountGeneralUsers, (state, action) => {
    return {
      ...state,
      totalCountGeneral: action.count
    }
  }),

  on(setCountUsers, (state, action) => {
    return {
      ...state,
      totalCount: action.count
    }
  }),

  on(getClearLoadedUser, (state, action) => {
    return {
      ...state,
      user: null
    }
  }),

  // @ts-ignore
  on(setSearchUsers, (state, action) => {
    return userAdapter.setAll(action.users, state);
  }),

  on(setUsers, (state, action) => {
    return userAdapter.setAll(action.users, {...state, usersLoaded: true});
  }),

  on(setGeneralUsers, (state, action) => {
    return {
      ...state,
      generalUsers: action.users,
      generalUsersLoaded: true
    }
  }),

  on(setBeauticianUsers, (state, action) => {
    return {
      ...state,
      beauticianUsers: action.users,
      beauticianUsersLoaded: true
    }
  }),

  on(setTherapistsUsers, (state, action) => {
    return {
      ...state,
      therapistsUsers: action.users
    }
  }),

  on(setUpdateUserState, (state, action) => {
    return userAdapter.setOne(action.user, state);
  }),

  // @ts-ignore
  on(setUpdateGeneralUserState, (state, action) => {
    // @ts-ignore
    const findIndex = state.generalUsers.findIndex((user, index) => {
      if(user._id === action.user._id){
        return true;
      }
    });

    // @ts-ignore
    const userObject = state.generalUsers[findIndex];
    const updatedUser = {
      ...userObject,
      ...action.user
    }
    // @ts-ignore
    const updatedArray = [...state.generalUsers];
    updatedArray[findIndex] = updatedUser;

    return {
      ...state,
      generalUsers: updatedArray
    }
  }),

  // @ts-ignore
  on(setUpdateBeauticianUserState, (state, action) => {
    // @ts-ignore
    const findIndex = state.beauticianUsers.findIndex((user, index) => {
      if(user._id === action.user._id){
        return true;
      }
    });

    // @ts-ignore
    const userObject = state.beauticianUsers[findIndex];
    const updatedUser = {
      ...userObject,
      ...action.user
    }
    // @ts-ignore
    const updatedArray = [...state.beauticianUsers];
    updatedArray[findIndex] = updatedUser;

    return {
      ...state,
      beauticianUsers: updatedArray
    }
  }),

  // @ts-ignore
  on(setUser, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  })

);

export const { selectAll, selectEntities, selectIds, selectTotal } = userAdapter.getSelectors();
