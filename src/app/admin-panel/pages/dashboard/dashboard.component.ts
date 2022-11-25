import { Component, OnInit } from '@angular/core';
import * as AboutActions from "../../store/actions/about.actions";
import * as ClientreviewsActions from "../../store/actions/client-reviews.actions";
import * as ServiceActions from "../../store/actions/services.actions";
import * as UserActions from "../../store/actions/user.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import {getTotalBeauticianUsers, getTotalGeneralUsers, getTotalUsers} from "../../store/selectors/user.selectors";


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalUserCount: number = 0;
  totalGeneralUserCount: number = 0;
  totalBeauticianUserCount: number = 0;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(AboutActions.getAbout());
    this.store.dispatch(AboutActions.getSocialLinks());
    this.store.dispatch(ClientreviewsActions.getTotalCount());
    this.store.dispatch(ServiceActions.getTotalCount());
    this.store.dispatch(UserActions.getCountUsers());
    this.store.dispatch(UserActions.getCountGeneralUsers());
    this.store.dispatch(UserActions.getCountBeauticianUsers());


    this.store.select(getTotalUsers).subscribe(count => {this.totalUserCount = count});
    this.store.select(getTotalGeneralUsers).subscribe(count => {this.totalGeneralUserCount = count});
    this.store.select(getTotalBeauticianUsers).subscribe(count => {this.totalBeauticianUserCount = count});
  }

}
