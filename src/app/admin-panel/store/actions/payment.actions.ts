import {createAction, props} from "@ngrx/store";
import {PaymentInterfaces} from "../interfaces/payment.interfaces";

// Create Enum Types
export enum AboutActionTypes {
  GET_PAYMENT_INFO = '[Payment Gateway] GET_PAYMENT_INFO',
  SET_PAYMENT_INFO = '[Payment Gateway] SET_PAYMENT_INFO',
  GET_CREATE_CARD_INFO = '[Payment Gateway] GET_CREATE_CARD_INFO',
  SET_CREATE_CARD_INFO = '[Payment Gateway] SET_CREATE_CARD_INFO',
}


export const getPaymentInfo = createAction(
  AboutActionTypes.GET_PAYMENT_INFO,
  props<{userId: string}>()
);
export const setPaymentInfo = createAction(
  AboutActionTypes.SET_PAYMENT_INFO,
  props<{payment: PaymentInterfaces | boolean}>()
);


export const getCreateCardInfo = createAction(
  AboutActionTypes.GET_CREATE_CARD_INFO,
  props<{userId: string,
    cardName: string,
    cardNumber: number,
    cardExpYear: number,
    cardExpMonth: number,
    cardCvc: number}>()
);
export const setCreateCardInfo = createAction(
  AboutActionTypes.SET_CREATE_CARD_INFO,
  props<{card: PaymentInterfaces}>()
);
