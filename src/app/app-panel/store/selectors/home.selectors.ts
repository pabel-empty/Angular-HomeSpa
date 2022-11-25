import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState, selectAll } from '../reducers/home.reducers';

export const homeFeatureSelectors = createFeatureSelector<HomeState>( 'home' );


export const getAllServices = createSelector(
  homeFeatureSelectors,
  selectAll
);

export const getErrors = createSelector(
  homeFeatureSelectors,
  ( state: HomeState ) => state.errors
);

