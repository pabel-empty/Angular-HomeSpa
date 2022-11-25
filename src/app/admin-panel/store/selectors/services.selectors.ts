import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectAll, ServicesState} from "../reducers/services.reducers";


// create services feature selectors
export const servicesFeatureSelectors = createFeatureSelector<ServicesState>('services');

// Select All
export const getServices = createSelector(
  servicesFeatureSelectors,
  selectAll
);

// Total Count
export const getTotalServiceCount = createSelector(
  servicesFeatureSelectors,
  state => state.totalCount
);
