import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, concatMap } from 'rxjs/operators';
import {
  getBeauticianUsers, getCountBeauticianUsers, getCountGeneralUsers, getCountUsers,
  getGeneralUsers, getLoggedInUserInfo,
  getSearchUsers,
  getTherapistsUsers,
  getUpdateBeauticianUserState,
  getUpdateGeneralUserState,
  getUpdateUserState, getUser,
  getUsers,
  setBeauticianUsers, setCountBeauticianUsers, setCountGeneralUsers, setCountUsers,
  setGeneralUsers, setLoggedInUserInfo, setSearchUsers,
  setTherapistsUsers,
  setUpdateBeauticianUserState,
  setUpdateGeneralUserState,
  setUpdateUserState, setUser,
  setUsers
} from '../actions/user.actions';
import { UserServices } from '../services/user.services';
import {UserInterface} from "../interfaces/user.interfaces";


@Injectable( { providedIn: 'root' } )
export class UserEffects {

  // Get Logged In User Info
  getLoggedInUserInfo = createEffect(
    () => this.actions$.pipe(
      ofType( getLoggedInUserInfo ),
      concatMap( () => this.userServices.getLoggedInUserInformation().pipe(
        map( user => setLoggedInUserInfo( { user } ) ),
      ) ),
    )
  );

  // Get All User
  getUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType( getUsers ),
      concatMap( ( { page, size } ) => this.userServices.getUsers( page, size ).pipe(
        map( users => setUsers( { users } ) ),
      ) ),
    )
  );

  // Get User
  getUser$ = createEffect(
    () => this.actions$.pipe(
      ofType( getUser ),
      concatMap( ( { id } ) => this.userServices.getUserById( id ).pipe(
        map( user => setUser( { user } ) ),
      ) ),
    )
  );

  // Get All Beautician User
  getBeauticianUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(getBeauticianUsers),
      concatMap(({page, size}) => {
        return this.userServices.getBeauticianUsers(page, size).pipe(
          map(users => setBeauticianUsers({users}))
        )
      })
    )
  );

  // Get All General User
  getGeneralUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(getGeneralUsers),
      concatMap(({page, size}) => {
        return this.userServices.getGeneralUsers(page, size).pipe(
          map((users:UserInterface[]) => setGeneralUsers({users}))
        )
      })
    )
  )

  // Get All Therapists User
  getTherapistsUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(getTherapistsUsers),
      concatMap(({page, size}) => {
        return this.userServices.getTherapistsUsers(page, size).pipe(
          map(users => setTherapistsUsers({users}))
        )
      })
    )
  )

  // Get Update user state by Account ID
  updateUserState$ = createEffect(
    () => this.actions$.pipe(
      ofType(getUpdateUserState),
      concatMap(({id, state}) => {
        return this.userServices.getUpdateUserStateByUserId(id, state).pipe(
          map(user => setUpdateUserState({user}))
        )
      })
    )
  );

  // Get Update general user state by Account ID
  updateGeneralUserState$ = createEffect(
    () => this.actions$.pipe(
      ofType(getUpdateGeneralUserState),
      concatMap(({id, state}) => {
        return this.userServices.getUpdateUserStateByUserId(id, state).pipe(
          map(user => setUpdateGeneralUserState({user}))
        )
      })
    )
  );

  // Get Update beautician user state by Account ID
  updateBeauticianUserState$ = createEffect(
    () => this.actions$.pipe(
      ofType(getUpdateBeauticianUserState),
      concatMap(({id, state}) => {
        return this.userServices.getUpdateUserStateByUserId(id, state).pipe(
          map(user => setUpdateBeauticianUserState({user}))
        )
      })
    )
  );

  // Get Search User
  searchUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(getSearchUsers),
      switchMap(({keyword,size,page}) => {
        return this.userServices.getSearchUsers(keyword, page, size).pipe(
          map(fromServerUsers => {
            let users = fromServerUsers ? fromServerUsers : [];
            return setSearchUsers({users})
          })
        )
      })
    )
  );

  // Get total counts
  getTotalCount$ = createEffect(
    () => this.actions$.pipe(
      ofType(getCountUsers),
      switchMap(() => {
        return this.userServices.getCountUsers().pipe(
          map(count => {
            return setCountUsers({count});
          })
        )
      })
    )
  );

  // Get total general user counts
  getTotalGeneralCount$ = createEffect(
    () => this.actions$.pipe(
      ofType(getCountGeneralUsers),
      switchMap(() => {
        return this.userServices.getCountGeneralUsers().pipe(
          map(count => {
            return setCountGeneralUsers({count});
          })
        )
      })
    )
  );

  // Get total beautician user counts
  getTotalBeauticianCount$ = createEffect(
    () => this.actions$.pipe(
      ofType(getCountBeauticianUsers),
      switchMap(() => {
        return this.userServices.getCountBeauticianUsers().pipe(
          map(count => {
            return setCountBeauticianUsers({count});
          })
        )
      })
    )
  );


  constructor( private actions$: Actions, private userServices: UserServices ) { }

}




