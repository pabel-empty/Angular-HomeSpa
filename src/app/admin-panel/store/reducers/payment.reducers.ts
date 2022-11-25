import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {PaymentInterfaces} from "../interfaces/payment.interfaces";
import {setCreateCardInfo, setPaymentInfo} from "../actions/payment.actions";

// Payment State
export interface PaymentState extends EntityState<PaymentInterfaces | any> {
  errors: any,
  payment: any,
  setNewPaymentInfo: any
}
// Payment Create Adapter
export const paymentAdapter = createEntityAdapter<PaymentInterfaces | boolean>({
  selectId: (entity: PaymentInterfaces | any) => entity._id
});

// Initial Payment State
export const paymentInitialState: PaymentState = paymentAdapter.getInitialState({
  errors: null,
  payment: null,
  setNewPaymentInfo: null
});

// Payment Reducers
export const paymentReducers = createReducer(
  paymentInitialState,

  on(setPaymentInfo, (state, action) => {
    // @ts-ignore
    return paymentAdapter.setOne(action.payment, state);
  }),

  on(setCreateCardInfo, (state, action) => {
    // @ts-ignore
    return paymentAdapter.setOne(action.card, {
      ...state,
      setNewPaymentInfo: action.card
    });
  }),

)

export const {selectAll} = paymentAdapter.getSelectors();
