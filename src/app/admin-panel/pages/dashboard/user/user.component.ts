import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducers";
import * as UserActions from "../../../store/actions/user.actions";
import {UserInterface} from "../../../store/interfaces/user.interfaces";
import {getAllUsers, usersLoaded} from "../../../store/selectors/user.selectors";
import {debounceTime, distinctUntilChanged, filter, fromEvent} from "rxjs";
import {tap} from "rxjs/operators";
import {getSearchUsers} from "../../../store/actions/user.actions";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  @ViewChild('searchByNameInput') searchByNameInput!: ElementRef;

  public users!: UserInterface[];
  public loaded: boolean = false;
  public searchLoadingSpinner: boolean = false;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUsers({page: 1, size: 10}));

    // @ts-ignore
    this.store.pipe(select(getAllUsers)).subscribe((users) => {
      this.searchLoadingSpinner = false;
      this.users = users;
    })

    this.store.pipe(select(usersLoaded)).subscribe(loaded => {
      this.loaded = loaded
    })
  }


  ngAfterViewInit() {
    // server-side search
    fromEvent(this.searchByNameInput.nativeElement,'keyup')
      .pipe(
        filter(Boolean),
        tap((text) => {
          this.searchLoadingSpinner = true
        }),
        debounceTime(150),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        let key = this.searchByNameInput.nativeElement.value;
        if(key.length !== 0){
          this.store.dispatch(getSearchUsers({keyword: key, page: 1, size: 10}));
        }else{
          this.store.dispatch(UserActions.getUsers({page: 1, size: 10}));
        }
      });
  }


}
