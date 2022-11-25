import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {ServicesInterface} from "../interfaces/services.interfaces";
import {createReducer, on} from "@ngrx/store";
import {
  setDeleteService,
  setNewService, setSearchedServices,
  setServices, setServicesByCategoryName,
  setTotalCount, setUpdateServiceById,
  setUpdateServiceStateById
} from "../actions/services.actions";

// Reducers Main State
export interface ServicesState extends EntityState<ServicesInterface> {
  errors: any,
  totalCount: any
}

// Create Entity Adapter
export const adapter = createEntityAdapter<ServicesInterface>({
  selectId: (entity) => entity._id
});

// Generate Initial State
export const initialState: ServicesState = adapter.getInitialState({
  errors: null,
  totalCount: null
});


// Main Reducers
export const servicesReducers = createReducer(
  initialState,

  on(setServices, (state, action) => {
    return adapter.setAll(action.services, state);
  }),

  on(setServicesByCategoryName, (state, action) => {
    return adapter.setAll(action.services, state);
  }),

  on(setSearchedServices, (state, action) => {
    return adapter.setAll(action.services, {...state, totalCount: action.count});
  }),

  on(setUpdateServiceStateById, (state, action) => {
    return adapter.setOne(action.service, state);
  }),

  on(setUpdateServiceById, (state, action) => {
    return adapter.setOne(action.service, state);
  }),

  on(setDeleteService, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),

  on(setNewService, (state, action) => {
    return adapter.addOne(action.service, state);
  }),

  on(setTotalCount, (state, action) => {
    return {
      ...state,
      totalCount: action.count
    }
  }),

)

// Export Entity Selectors
export const { selectAll, selectIds, selectTotal, selectEntities } = adapter.getSelectors();
