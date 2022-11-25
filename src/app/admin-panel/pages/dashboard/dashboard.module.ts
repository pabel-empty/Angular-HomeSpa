import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CardModule, FormModule, NavbarModule, NavModule, SpinnerModule} from '@coreui/angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { GeneralUserComponent } from './general-user/general-user.component';
import { BeauticianUserComponent } from './beautician-user/beautician-user.component';
import { TherapistsUserComponent } from './therapists-user/therapists-user.component';
import { ClientReviewsComponent } from './client-reviews/client-reviews.component';
import { ServicesComponent } from './services/services.component';
import { PricingPlanComponent } from './pricing-plan/pricing-plan.component';
import {SharedModule} from "../../../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    UserComponent,
    GeneralUserComponent,
    BeauticianUserComponent,
    TherapistsUserComponent,
    ClientReviewsComponent,
    ServicesComponent,
    PricingPlanComponent],
    imports: [
        DashboardRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormModule,
        SharedModule,
        FormsModule,
        SpinnerModule,
        CardModule,
        NgxPaginationModule,
        NavModule,
        NavbarModule
    ],
})
export class DashboardModule {
}
