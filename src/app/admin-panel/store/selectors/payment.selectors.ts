import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PaymentState} from "../reducers/payment.reducers";


export const paymentFeatureSelectors = createFeatureSelector<PaymentState>('payment');

export const getPaymentInformation = createSelector(
  paymentFeatureSelectors,
  state => state.payment
)

export const getNewCreatedPaymentCardInfo = createSelector(
  paymentFeatureSelectors,
  state => state.setNewPaymentInfo
)

