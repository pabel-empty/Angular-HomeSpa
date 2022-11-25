import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AboutState, selectAll} from "../reducers/about.reducers";


export const aboutFeatureSelectors = createFeatureSelector<AboutState>('about');

export const getAbout = createSelector(
  aboutFeatureSelectors,
  selectAll
);

export const getSocialLinks = createSelector(
  aboutFeatureSelectors,
  state => state.socialLinks
)
