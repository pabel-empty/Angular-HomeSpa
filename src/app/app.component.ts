import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "./app.reducers";
import * as UserActions from './admin-panel/store/actions/user.actions';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private store:Store<AppState>) {
  }

  ngOnInit() {
    this.authService.autoLogin()
    this.store.dispatch(UserActions.getLoggedInUserInfo())
  }


}
