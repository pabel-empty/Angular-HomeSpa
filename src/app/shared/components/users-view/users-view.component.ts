import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from "../../../admin-panel/store/interfaces/user.interfaces";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import * as UserActions from "../../../admin-panel/store/actions/user.actions";

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  userProfilePic = {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1px solid #aed8e9'
  };

  // Properties
  @Input() users: UserInterface[] = [];
  @Input() loaded: boolean = false;
  @Input() userType: string = '';
  public user!: UserInterface;
  public visible: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  showUser(user: UserInterface){
    this.user = user;
    this.visible = !this.visible;
  }

  updateToDisabled(user: UserInterface){
    if(this.userType === 'USER'){
      this.store.dispatch(UserActions.getUpdateUserState({state: 'DISABLED', id: user._id}));
      return;
    }
    if(this.userType === 'GENERAL_USER'){
      this.store.dispatch(UserActions.getUpdateGeneralUserState({state: 'DISABLED', id: user._id}));
      return;
    }
    if(this.userType === 'BEAUTICIAN_USER'){
      this.store.dispatch(UserActions.getUpdateBeauticianUserState({state: 'DISABLED', id: user._id}));
      return;
    }
  }

  updateToDeleted(user: UserInterface){
    if(this.userType === 'USER'){
      this.store.dispatch(UserActions.getUpdateUserState({state: 'DELETED', id: user._id}));
      return;
    }
    if(this.userType === 'GENERAL_USER'){
      this.store.dispatch(UserActions.getUpdateGeneralUserState({state: 'DELETED', id: user._id}));
      return;
    }
    if(this.userType === 'BEAUTICIAN_USER'){
      this.store.dispatch(UserActions.getUpdateBeauticianUserState({state: 'DELETED', id: user._id}));
      return;
    }
  }

  permanentlyDelete(user: UserInterface){

  }

  updateToActive(user: UserInterface){
    if(this.userType === 'USER'){
      this.store.dispatch(UserActions.getUpdateUserState({state: 'ACTIVE', id: user._id}));
      return;
    }
    if(this.userType === 'GENERAL_USER'){
      this.store.dispatch(UserActions.getUpdateGeneralUserState({state: 'ACTIVE', id: user._id}));
      return;
    }
    if(this.userType === 'BEAUTICIAN_USER'){
      this.store.dispatch(UserActions.getUpdateBeauticianUserState({state: 'ACTIVE', id: user._id}));
      return;
    }
  }


}
