import { ActionReducerMap } from '@ngrx/store';
import { homeReducers, HomeState } from './app-panel/store/reducers/home.reducers';
import {AuthState} from "./auth/store/auth.interfaces";
import {authReducers} from "./auth/store/auth.reducers";
import {userReducers, UserState} from "./admin-panel/store/reducers/user.reducers";
import {aboutReducers, AboutState} from "./admin-panel/store/reducers/about.reducers";
import {clientReviewsReducers, ClientReviewsState} from "./admin-panel/store/reducers/client-reviews.reducers";
import {servicesReducers, ServicesState} from "./admin-panel/store/reducers/services.reducers";
import {pricingReducers, PricingState} from "./admin-panel/store/reducers/pricing.reducers";
import {paymentReducers, PaymentState} from "./admin-panel/store/reducers/payment.reducers";

export interface AppState {
  auth: AuthState,
  home: HomeState;
  user: UserState,
  about: AboutState,
  reviews: ClientReviewsState,
  services: ServicesState,
  pricing: PricingState,
  payment: PaymentState
}

// @ts-ignore
export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducers as any,
  home: homeReducers,
  user: userReducers as any,
  about: aboutReducers,
  reviews: clientReviewsReducers,
  services: servicesReducers,
  pricing: pricingReducers,
  payment: paymentReducers
}

