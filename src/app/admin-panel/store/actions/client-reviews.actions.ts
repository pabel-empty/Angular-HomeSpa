import {createAction, props} from "@ngrx/store";
import {ClientReviewsInterface} from "../interfaces/client-reviews.interfaces";


// Create Enum Types
export enum ReviewActionTypes {
  GET_CLIENT_REVIEWS = '[Client Reviews] GET_CLIENT_REVIEWS',
  SET_CLIENT_REVIEWS = '[Client Reviews] SET_CLIENT_REVIEWS',
  GET_UPDATE_CLIENT_REVIEWS = '[Client Reviews] GET_UPDATE_CLIENT_REVIEWS',
  SET_UPDATE_CLIENT_REVIEWS = '[Client Reviews] SET_UPDATE_CLIENT_REVIEWS',
  GET_DEL_CLIENT_REVIEW_BY_ID = '[Client Reviews] GET_DEL_CLIENT_REVIEW_BY_ID',
  SET_DEL_CLIENT_REVIEW_BY_ID = '[Client Reviews] SET_DEL_CLIENT_REVIEW_BY_ID',
  GET_TOTAL_COUNT = '[Client Reviews] GET_TOTAL_COUNT',
  SET_TOTAL_COUNT = '[Client Reviews] SET_TOTAL_COUNT',
}



export const getTotalCount = createAction(
  ReviewActionTypes.GET_TOTAL_COUNT,
);
export const setTotalCount = createAction(
  ReviewActionTypes.SET_TOTAL_COUNT,
  props<{ count: number }>()
);

export const getDeleteClientReviewById = createAction(
  ReviewActionTypes.GET_DEL_CLIENT_REVIEW_BY_ID,
  props<{ id: string }>()
);
export const setDeleteClientReviewById = createAction(
  ReviewActionTypes.SET_DEL_CLIENT_REVIEW_BY_ID,
  props<{ confirm: boolean, id: string }>()
);

export const getUpdateClientReviewState = createAction(
  ReviewActionTypes.GET_UPDATE_CLIENT_REVIEWS,
  props<{ state: string, id: string }>()
);
export const setUpdateClientReviewState = createAction(
  ReviewActionTypes.SET_UPDATE_CLIENT_REVIEWS,
  props<{ review: ClientReviewsInterface }>()
);


export const getClientReviews = createAction(
  ReviewActionTypes.GET_CLIENT_REVIEWS,
  props<{ page: number; size: number; }>()
);
export const setClientReviews = createAction(
  ReviewActionTypes.SET_CLIENT_REVIEWS,
  props<{ reviews: ClientReviewsInterface[] }>()
);



