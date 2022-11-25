import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as PaymentActions from '../actions/payment.actions';
import {concatMap, map} from "rxjs/operators";
import {PaymentServices} from "../services/payment.services";


@Injectable({
  providedIn: 'root'
})
export class PaymentEffects {

  // get Payment information
  getPaymentInfo$ = createEffect(
    () => this.actions$.pipe(
      ofType(PaymentActions.getPaymentInfo),
      concatMap(({userId}) => {
        return this.paymentService.getPaymentInfo(userId).pipe(
          map(paymentInfo => {
            return PaymentActions.setPaymentInfo({payment: paymentInfo});
          })
        )
      })
    )
  );

  // get Payment information
  getCreateCardInformation$ = createEffect(
    () => this.actions$.pipe(
      ofType(PaymentActions.getCreateCardInfo),
      concatMap(({userId, cardCvc, cardExpMonth, cardNumber, cardExpYear, cardName}) => {
        return this.paymentService.getCreateCardInformation(userId, cardName, cardNumber, cardExpYear, cardExpMonth, cardCvc).pipe(
          map(paymentInfo => {
            return PaymentActions.setCreateCardInfo({card: paymentInfo});
          })
        )
      })
    )
  );

  constructor(private actions$: Actions, private paymentService: PaymentServices) {
  }
}

