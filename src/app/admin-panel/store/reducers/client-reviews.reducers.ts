import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {ClientReviewsInterface} from "../interfaces/client-reviews.interfaces";
import {createReducer, on} from "@ngrx/store";
import {
  setClientReviews,
  setDeleteClientReviewById, setTotalCount,
  setUpdateClientReviewState
} from "../actions/client-reviews.actions";

// Reducers Main State
export interface ClientReviewsState extends EntityState<ClientReviewsInterface> {
  errors: any,
  totalCount: any
}

// Create Entity Adapter
export const adapter = createEntityAdapter<ClientReviewsInterface>({
  selectId: (entity) => entity._id
});

// Generate Initial State
export const initialState: ClientReviewsState = adapter.getInitialState({
  errors: null,
  totalCount: null
});

// Create Reducer
export const clientReviewsReducers = createReducer(
  initialState,

  on(setClientReviews, (state, action) => {
    return adapter.setAll(action.reviews, state);
  }),

  on(setUpdateClientReviewState, (state, action) => {
    return adapter.setOne(action.review, state);
  }),

  on(setDeleteClientReviewById, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),

  on(setTotalCount, (state, action) => {
    return {
      ...state,
      totalCount: action.count
    }
  }),

);

// Export Entity Adapter Default Selectors
export const { selectAll, selectIds, selectTotal, selectEntities } = adapter.getSelectors();
