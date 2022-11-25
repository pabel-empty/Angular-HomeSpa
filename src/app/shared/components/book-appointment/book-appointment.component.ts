import {
  Component,
  ComponentFactoryResolver, ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import { PopupBoxDirective } from '../../directives/popup-box.directive';
import { BookAppointmentFormComponent } from '../book-appointment-form/book-appointment-form.component';
import {UserInterface} from "../../../admin-panel/store/interfaces/user.interfaces";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import * as UserActions from "../../../admin-panel/store/actions/user.actions";
import {getBeauticianUsers} from "../../../admin-panel/store/selectors/user.selectors";
import {AuthFormComponent} from "../../../auth/auth-form/auth-form.component";
import {HttpClient} from "@angular/common/http";

declare var $ : any;

@Component( {
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: [ './book-appointment.component.css' ],
} )
export class BookAppointmentComponent implements OnInit {

  @Output() closePopup = new EventEmitter<void>();
  @ViewChild( PopupBoxDirective ) viewContainerRef!: PopupBoxDirective;
  // Decorate the child component with the directive
  @ViewChild( PopupBoxDirective ) popupBoxRef!: PopupBoxDirective;

  public popupSubscription!: Subscription;
  public beauticianInfo!: UserInterface;
  public beauticianAvailableDate!: string;
  public users!: UserInterface[];
  private popupBoxSubscription!: Subscription;
  public availableForAppointment: boolean = false;
  dateTime!: string;


  constructor(private http: HttpClient, public componentFactoryResolver: ComponentFactoryResolver, private store: Store<AppState>) {

  }

  ngOnInit(): void {

    // Dispatch General User Method
    this.store.dispatch(UserActions.getBeauticianUsers({page: 1, size: 10}));

    // get all beautician users
    this.store.select(getBeauticianUsers).subscribe(users => {
      this.users = users;
    })

    this.store.select('auth').subscribe(auth => {
      if(auth.user != null){
        this.popupBoxRef.viewContainerRef.clear()
      }
    })
  }

  close(): void {
    this.closePopup.emit();
  }

  bookAppointment(dateTime: string): void {
    let user = localStorage.getItem('user');
    console.log(user);
    if(user !== null){
      this.beauticianAvailableDate = dateTime;
      const popupBoxComponent = this.componentFactoryResolver.resolveComponentFactory( BookAppointmentFormComponent );
      const containerRef = this.viewContainerRef.viewContainerRef;
      containerRef.clear();
      const componentRef = containerRef.createComponent( popupBoxComponent );
      componentRef.instance.beauticianInfo = this.beauticianInfo;
      componentRef.instance.beauticianAvailableDate = this.beauticianAvailableDate;

      this.popupSubscription = componentRef.instance.closePopup.subscribe( () => {
        this.popupSubscription.unsubscribe();
        containerRef.clear();
      } );

    }else{
      this.popupBoxRef.viewContainerRef.clear();

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

  bookingSchedule(user: UserInterface) {
    this.beauticianInfo = user;
  }

  availableAppointmentList() {
    this.availableForAppointment = !this.availableForAppointment;
  }


  printDateTime(){
    const splitDate = this.dateTime.toString().split(" ");
    const day = splitDate[0];
    const month = splitDate[1];
    const date = splitDate[2];
    const year = splitDate[3];
    console.log(`${year}, ${month}, ${date}, ${day}`)
  }
}
