import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "./store/auth.interfaces";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducers";
import {SetAuthenticateSuccess} from "./store/auth.actions";
import {Router} from "@angular/router";
import {UserInterface} from "../admin-panel/store/interfaces/user.interfaces";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private store: Store<AppState>, private router: Router) {
  }

  getLogin(email: any, password:any): Observable<LoginResponse> {
    const credentials = {
      email: email,
      password: password
    }
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`, credentials);
  }

  getSignUp(firstName: string | null | undefined, lastName:string | null | undefined, email:string | null | undefined, username: string | null | undefined, password: string | null | undefined, userType:string | null | undefined, gender: string | null | undefined): Observable<UserInterface> {
    const credentials = {
      email,
      password,
      firstName,
      lastName,
      username,
      userType,
      gender
    }
    return this.http.post<UserInterface>(`${this.baseUrl}/user/sign-up`, credentials);
  }

  autoLogin() {
    // Get user credentials from localStorage
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      this.router.navigate(['/home']);
      return;
    }

    // Get Token Expires Date over or not
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(user.token);

    if(isExpired){

      localStorage.removeItem('user');
      this.router.navigate(['/home']);

    } else {

      if(user.accountType === 'SUPER_ADMIN'){
        this.router.navigate(['/admin-control'])
      }else if(user.accountType === 'USER' || user.accountType === 'BEAUTICIAN' || user.accountType === 'THERAPISTS'){
        this.router.navigate(['/home'])
      }

      this.store.dispatch(
        new SetAuthenticateSuccess({
          expiresIn: user.expiresIn,
          token: user.token,
          accountType: user.accountType,
          message: user.message
        })
      )
    }
  }


  // Logout User
  logoutUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

}

