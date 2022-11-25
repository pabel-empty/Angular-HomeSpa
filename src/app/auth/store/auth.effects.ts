import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../auth.service";
import * as AuthActions from "./auth.actions";
import {GET_LOGIN, GET_SIGN_UP} from "./auth-action-types";
import {catchError, concatMap, map} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorService} from "../../utils/http-error.service";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  @Effect()
  getLogin = this.actions$.pipe(
    ofType(GET_LOGIN),
    concatMap((action: AuthActions.GetLogin) =>{
      return this.authService.getLogin(action.payload.email, action.payload.password).pipe(
        map(data => {
          // Set user credentials in localStorage
          localStorage.setItem('user', JSON.stringify(data));

          if(data.accountType === 'SUPER_ADMIN'){
            this.router.navigate(['/admin-control'])
          }else if(data.accountType === 'USER' || data.accountType === 'BEAUTICIAN' || data.accountType === 'THERAPISTS'){
            this.router.navigate(['/home'])
          }

          return new AuthActions.SetLogin({
            accountType: data.accountType,
            message: data.message,
            token: data.token,
            expiresIn: data.expiresIn
          })
        }),
        catchError((err: HttpErrorResponse) => {
          let errorMsg = this.httpErrorService.httpErrorHandler(err);
          return of(
            new AuthActions.Errors(errorMsg)
          );
        })
      )
    })
  );


  @Effect()
  getSignUp = this.actions$.pipe(
    ofType(GET_SIGN_UP),
    concatMap((action: AuthActions.GetUserSignUp) =>{
      const { firstName, password, email, lastName, username, gender, userType } = action.payload;
      return this.authService.getSignUp(firstName, lastName, email, username,password, userType, gender).pipe(
        map(data => {
          return of(
            new AuthActions.SetUserSignUp(true)
          );
        }),
        catchError((err: HttpErrorResponse) => {
          let errorMsg = this.httpErrorService.httpErrorHandler(err);
          return of(
            new AuthActions.Errors(errorMsg)
          );
        })
      )
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private authService: AuthService,
              private httpErrorService: HttpErrorService,
              private router: Router) {}
}
