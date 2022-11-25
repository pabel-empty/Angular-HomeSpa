import {createAction, props} from "@ngrx/store";
import {Plan, PricingInterface} from "../interfaces/pricing.interfaces";

// Create Enum Types
export enum PricingActionTypes {
  GET_CREATE_PRICE = '[Pricing] GET_CREATE_PRICE',
  SET_CREATE_PRICE = '[Pricing] SET_CREATE_PRICE',
  GET_PRICING_LIST = '[Pricing] GET_PRICING_LIST',
  SET_PRICING_LIST = '[Pricing] SET_PRICING_LIST',
  GET_UPDATE_PRICE = '[Pricing] GET_UPDATE_PRICE',
  SET_UPDATE_PRICE = '[Pricing] SET_UPDATE_PRICE',
  GET_DELETE_PRICE = '[Pricing] GET_DELETE_PRICE',
  SET_DELETE_PRICE = '[Pricing] SET_DELETE_PRICE',
}


export const getCreatePrice = createAction(
  PricingActionTypes.GET_CREATE_PRICE,
  props<{title: string; planType: string; plans: Plan[]}>()
);
export const setCreatedPrice = createAction(
  PricingActionTypes.SET_CREATE_PRICE,
  props<{price: PricingInterface}>()
);


export const getPricingList = createAction(
  PricingActionTypes.GET_PRICING_LIST,
)
export const setPricingList = createAction(
  PricingActionTypes.SET_PRICING_LIST,
  props<{prices: PricingInterface[]}>()
)

export const getUpdatePrice = createAction(
  PricingActionTypes.GET_UPDATE_PRICE,
  props<{id: string, state: string}>()
)
export const setUpdatePrice = createAction(
  PricingActionTypes.SET_UPDATE_PRICE,
  props<{price: PricingInterface}>()
)

export const getDeletePrice = createAction(
  PricingActionTypes.GET_DELETE_PRICE,
  props<{id: string}>()
)
export const setDeletePrice = createAction(
  PricingActionTypes.SET_DELETE_PRICE,
  props<{id: string}>()
)
