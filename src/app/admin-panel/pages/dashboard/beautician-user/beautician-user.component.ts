import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../../store/interfaces/user.interfaces";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducers";
import * as UserActions from '../../../store/actions/user.actions';
import {beauticianUsersLoaded, getBeauticianUsers} from "../../../store/selectors/user.selectors";

@Component({
  selector: 'app-beautician-user',
  templateUrl: './beautician-user.component.html',
  styleUrls: ['./beautician-user.component.css']
})
export class BeauticianUserComponent implements OnInit {

  public users!: UserInterface[];
  public loaded: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // Dispatch General User Method
    this.store.dispatch(UserActions.getBeauticianUsers({page: 1, size: 10}));

    // get all beautician users
    this.store.select(getBeauticianUsers).subscribe(users => {
      this.users = users;
    })

    // data loaded or not
    this.store.select(beauticianUsersLoaded).subscribe(loaded => this.loaded = loaded);

  }

}
