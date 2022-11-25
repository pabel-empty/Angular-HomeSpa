import { createFeatureSelector, createSelector } from '@ngrx/store';
import {selectAll, UserState} from '../reducers/user.reducers';

export const userFeatureSelectors = createFeatureSelector<UserState>( 'user' );


export const getAllUsers = createSelector(
  userFeatureSelectors,
  selectAll
);

export const getLoggedInUserInformation = createSelector(
  userFeatureSelectors,
  state => state.loggedInUser
);

export const getUser = createSelector(
  userFeatureSelectors,
  state => state.user
);

export const getTotalUsers = createSelector(
  userFeatureSelectors,
  state => state.totalCount
);

export const getTotalGeneralUsers = createSelector(
  userFeatureSelectors,
  state => state.totalCountGeneral
);

export const getTotalBeauticianUsers = createSelector(
  userFeatureSelectors,
  state => state.totalCountBeautician
);

export const usersLoaded = createSelector(
  userFeatureSelectors,
  state => state.usersLoaded
);

export const getGeneralUsers = createSelector(
  userFeatureSelectors,
  state => state.generalUsers
);
//
// export const getSearchedUsers = createSelector(
//   userFeatureSelectors,
//   state => state.searchUsers
// );

export const generalUsersLoaded = createSelector(
  userFeatureSelectors,
  state => state.generalUsersLoaded
);

export const getBeauticianUsers = createSelector(
  userFeatureSelectors,
  state => state.beauticianUsers
);

export const beauticianUsersLoaded = createSelector(
  userFeatureSelectors,
  state => state.beauticianUsersLoaded
);

export const getTherapistsUsers = createSelector(
  userFeatureSelectors,
  state => state.therapistsUsers
);


export const getErrors = createSelector(
  userFeatureSelectors,
  ( state: UserState ) => state.errors
);

