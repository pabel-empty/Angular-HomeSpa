import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../../store/interfaces/user.interfaces";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducers";
import * as UserActions from "../../../store/actions/user.actions";
import {generalUsersLoaded, getGeneralUsers} from "../../../store/selectors/user.selectors";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-general-user',
  templateUrl: './general-user.component.html',
  styleUrls: ['./general-user.component.css']
})
export class GeneralUserComponent implements OnInit {

  public users!: UserInterface[];
  public loaded: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // Dispatch General User Method
    this.store.dispatch(UserActions.getGeneralUsers({page:1, size: 10}));

    // get all general users
    this.store.select(getGeneralUsers).subscribe((users) => {
      this.users = users;
    })

    // data loaded or not
    this.store.select(generalUsersLoaded).subscribe(loaded => this.loaded = loaded);

  }

}
