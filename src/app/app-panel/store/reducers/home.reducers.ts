import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';

// Main State of the home page
export interface HomeState extends EntityState<any> {
  errors: any;
}

// Entity Adapter for the home page
export const homeAdapter = createEntityAdapter<any>( {
  selectId: ( entity: any ) => entity.id,
} );

// initial state of the home page
const initialState = homeAdapter.getInitialState( {
  errors: null,
} );


// Reducer for the home page
export const homeReducers = createReducer(
  initialState,


);

export const { selectAll, selectEntities, selectIds, selectTotal } = homeAdapter.getSelectors();
