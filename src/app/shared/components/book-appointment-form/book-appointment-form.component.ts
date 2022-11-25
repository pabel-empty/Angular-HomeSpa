import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {UserInterface} from "../../../admin-panel/store/interfaces/user.interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getPaymentInfo} from "../../../admin-panel/store/actions/payment.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";

@Component( {
  selector: 'app-book-appointment-form',
  templateUrl: './book-appointment-form.component.html',
  styleUrls: [ './book-appointment-form.component.css' ]
} )
export class BookAppointmentFormComponent implements OnInit {
  @Output() closePopup = new EventEmitter<void>();
  @Input() beauticianInfo!: UserInterface;
  @Input() beauticianAvailableDate!: string;
  public gender: string = 'male';

  appointmentForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required
    ])
  });

  constructor( private router: Router, private store: Store<AppState> ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.closePopup.emit();
  }

  userNavigate() {
    const credentials = {
      beauticianInfo: this.beauticianInfo,
      beauticianAvailableDate: this.beauticianAvailableDate,
      appointmentUserInfo: {
        name: this.appointmentForm.value.name,
        address: this.appointmentForm.value.address,
        email: this.appointmentForm.value.email,
        gender: this.gender
      }
    }
    // this.store.dispatch(getPaymentInfo({userId: '63063b8d2e89392abf33e50b'}));
    this.router.navigate( [ '/payment' ], {state: credentials} );
  }

  onItemChange(item: any) {
    this.gender = item.target.value;
  }
}
