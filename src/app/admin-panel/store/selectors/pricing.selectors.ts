import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PricingState, selectAll} from "../reducers/pricing.reducers";


export const pricingFeatureSelectors = createFeatureSelector<PricingState>('pricing');

export const getAllPricingList = createSelector(
  pricingFeatureSelectors,
  selectAll
)
