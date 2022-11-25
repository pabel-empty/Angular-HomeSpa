import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {PricingInterface} from "../interfaces/pricing.interfaces";
import {createReducer, on} from "@ngrx/store";
import {setCreatedPrice, setDeletePrice, setPricingList, setUpdatePrice} from "../actions/pricing.actions";

// Pricing State
export interface PricingState extends EntityState<PricingInterface> {
  errors: any,
  totalCount: number
}

// Create Entity Adapter
export const adapter = createEntityAdapter<PricingInterface>({
  selectId: model => model._id
});

// InitialState
export const initialState: PricingState = adapter.getInitialState({
  errors: null,
  totalCount: 0
})

// Main Reducers
export const pricingReducers = createReducer(
  initialState,

  on(setCreatedPrice, (state, action) => adapter.setOne(
    action.price, state
  )),

  on(setPricingList, (state, action) => adapter.setAll(
    action.prices, state
  )),

  on(setUpdatePrice, (state, action) => adapter.setOne(
    action.price, state
  )),

  on(setDeletePrice, (state, action) => adapter.removeOne(
    action.id, state
  )),
)

// Export selectors
export const { selectAll } = adapter.getSelectors();

