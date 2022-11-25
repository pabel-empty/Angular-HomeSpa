import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './app-panel/store/effects/home.effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "./auth/interceptor.service";
import {AuthEffects} from "./auth/store/auth.effects";
import {AuthService} from "./auth/auth.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {AuthFormComponent} from "./auth/auth-form/auth-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UserEffects} from "./admin-panel/store/effects/user.effects";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AboutEffects} from "./admin-panel/store/effects/about.effects";
import {ClientReviewsEffects} from "./admin-panel/store/effects/client-reviews.effects";
import {ServicesEffects} from "./admin-panel/store/effects/services.effects";
import {PricingEffects} from "./admin-panel/store/effects/pricing.effects";
import {PaymentEffects} from "./admin-panel/store/effects/payment.effects";

@NgModule( {
  declarations: [
    AppComponent,
    AuthFormComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot( [
      HomeEffects,
      AuthEffects,
      UserEffects,
      AboutEffects,
      ClientReviewsEffects,
      ServicesEffects,
      PricingEffects,
      PaymentEffects
    ] ),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
