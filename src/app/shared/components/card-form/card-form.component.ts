import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import jwt_decode from 'jwt-decode'
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import * as PaymentActions from '../../../admin-panel/store/actions/payment.actions'
import {getNewCreatedPaymentCardInfo} from "../../../admin-panel/store/selectors/payment.selectors";

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  @Output() closePopup = new EventEmitter<void>();
  cardForm: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    cardCvc: new FormControl('', [Validators.required]),
    expMonth: new FormControl('', [Validators.required]),
    expYear: new FormControl('', [Validators.required]),
  })

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getNewCreatedPaymentCardInfo).subscribe(cardInfo => {
      if(cardInfo !== null){
        this.close();
      }
    });
  }

  close(): void {
    this.closePopup.emit();
  }

  submitCardInformation(){
    if(this.cardForm.valid){
      const { cardNumber, cardCvc, expMonth, expYear } = this.cardForm.value;
      // @ts-ignore
      const userToken = JSON.parse(localStorage.getItem('user')).token
      // @ts-ignore
      const decodeToken = jwt_decode(userToken);

      this.store.dispatch(PaymentActions.getCreateCardInfo({
        cardCvc: cardCvc,
        cardName: 'Visa Card',
        cardExpYear: expYear,
        cardNumber: cardNumber,
        cardExpMonth: expMonth,
        // @ts-ignore
        userId: decodeToken.id,
      }))
    }



  }
}
