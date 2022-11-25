import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ClientReviewsState, selectAll} from "../reducers/client-reviews.reducers";


// create client reviews feature selectors
export const clientReviewsFeatureSelectors = createFeatureSelector<ClientReviewsState>('reviews');

// Select All
export const getClientReviews = createSelector(
  clientReviewsFeatureSelectors,
  selectAll
);

// Total Count
export const getTotalReviewCount = createSelector(
  clientReviewsFeatureSelectors,
  state => state.totalCount
);
