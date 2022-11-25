import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, fromEvent, Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {getSearchUsers} from "../../../admin-panel/store/actions/user.actions";
import * as UserActions from "../../../admin-panel/store/actions/user.actions";
import {UserInterface} from "../../../admin-panel/store/interfaces/user.interfaces";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import {getAllUsers} from "../../../admin-panel/store/selectors/user.selectors";
import {Router} from "@angular/router";
import {BookAppointmentComponent} from "../../../shared/components/book-appointment/book-appointment.component";
import {PopupBoxDirective} from "../../../shared/directives/popup-box.directive";
import {AuthFormComponent} from "../../../auth/auth-form/auth-form.component";

@Component( {
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
} )
export class NavbarComponent implements OnInit, AfterViewInit {
  // Decorate the child component with the directive
  @ViewChild( PopupBoxDirective ) popupBoxRef!: PopupBoxDirective;
  @ViewChild('searchByNameInput') searchByNameInput!: ElementRef;
  @ViewChild('searchService') searchService!: ElementRef;
  userProfilePic = {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1px solid #aed8e9'
  };

  public users!: UserInterface[];
  public searchLoadingSpinner: boolean = false;
  public beauticianSearchedListOpen: boolean = false;
  public serviceSearchedListOpen: boolean = false;
  public profileViewList: boolean = false;
  public loaded: boolean = false;
  public authenticated: boolean = false;
  private popupBoxSubscription!: Subscription;

  constructor(private store: Store<AppState>, private router: Router, private componentFactoryResolver: ComponentFactoryResolver,) {
    let user = localStorage.getItem('user');
    this.authenticated = !!user;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.store.pipe(select(getAllUsers)).subscribe((users) => {
      this.searchLoadingSpinner = false;
      this.users = users;
      this.loaded = true;
    })
    this.store.select('auth').subscribe(auth => {
      if(auth.user != null){
        this.authenticated = true
        this.popupBoxRef.viewContainerRef.clear()
      }
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
          this.users = [];
        }
      });
  }

  logOutUser(){
    localStorage.clear();
    this.authenticated = false;
    this.profileViewList = false;
  }

  openForm() {
    const popupBoxComponent = this.componentFactoryResolver.resolveComponentFactory( AuthFormComponent );
    const viewContainerRef = this.popupBoxRef.viewContainerRef;

    viewContainerRef.clear();
    const containerRef = viewContainerRef.createComponent( popupBoxComponent );

    this.popupBoxSubscription = containerRef.instance.closePopup.subscribe( () => {
      this.popupBoxSubscription.unsubscribe();
      viewContainerRef.clear();
    } );
  }
}
