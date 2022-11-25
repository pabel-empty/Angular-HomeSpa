import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../../admin-panel/store/interfaces/user.interfaces";
import * as UserActions from "../../../admin-panel/store/actions/user.actions";
import {getBeauticianUsers} from "../../../admin-panel/store/selectors/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";

@Component({
  selector: 'app-therapists',
  templateUrl: './therapists.component.html',
  styleUrls: ['./therapists.component.css']
})
export class TherapistsComponent implements OnInit {

  public users!: UserInterface[];
  public loaded: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // Dispatch General User Method
    this.store.dispatch(UserActions.getBeauticianUsers({page: 1, size: 30}));

    // get all beautician users
    this.store.select(getBeauticianUsers).subscribe(users => {
      this.users = users;
    })
  }

}
