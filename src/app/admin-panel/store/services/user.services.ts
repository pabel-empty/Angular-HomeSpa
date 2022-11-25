import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {UserInterface} from "../interfaces/user.interfaces";
import {Observable} from "rxjs";


@Injectable( { providedIn: 'root' } )
export class UserServices {
  // Base Url
  readonly baseUrl = environment.baseApiUrl;

  constructor( private http: HttpClient ) { }

  // get logged in user information
  getLoggedInUserInformation(): Observable<UserInterface> {
    return this.http.get<UserInterface>( `${this.baseUrl}/user/logged-in-user-information` );
  }

  // Get Users
  getUsers( page: number, size: number ): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>( `${this.baseUrl}/user/find/all?page=${ page }&size=${ size }` );
  }

  // Get User
  getUserById(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.baseUrl}/user/find/by/id/${id}`);
  }

  // Get General Users
  getGeneralUsers(page: number, size: number): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}/user/find/all/general?page=${ page }&size=${ size }`);
  }

  // Get Beautician Users
  getBeauticianUsers(page: number, size: number): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}/user/find/all/beautician?page=${ page }&size=${ size }`);
  }

  // Get Therapists Users
  getTherapistsUsers(page: number, size: number): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}/user/find/all/therapists?page=${ page }&size=${ size }`);
  }

  // Get Update User state by User Account ID
  getUpdateUserStateByUserId(id: string, state: string): Observable<UserInterface> {
    const userCredentials = {
      state: state
    }
    return this.http.post<UserInterface>(`${this.baseUrl}/user/update/state/by/id/${id}`, userCredentials);
  }

  // Get Search Users
  getSearchUsers(keyword: string, page: number, size: number): Observable<UserInterface[]> {
    const userCredentials = {
      keyword: keyword
    }
    return this.http.post<UserInterface[]>(`${this.baseUrl}/user/search/name-keyword?page=${page}&size=${size}`, userCredentials);
  }

  getCountUsers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/user/total`);
  }

  getCountGeneralUsers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/user/total-clients`);
  }

  getCountBeauticianUsers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/user/total-beauticians`);
  }

}
