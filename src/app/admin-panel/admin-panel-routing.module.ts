import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./containers";
import {UserComponent} from "./pages/dashboard/user/user.component";
import {GeneralUserComponent} from "./pages/dashboard/general-user/general-user.component";
import {BeauticianUserComponent} from "./pages/dashboard/beautician-user/beautician-user.component";
import {TherapistsUserComponent} from "./pages/dashboard/therapists-user/therapists-user.component";
import {AboutComponent} from "./pages/dashboard/about/about.component";
import {ClientReviewsComponent} from "./pages/dashboard/client-reviews/client-reviews.component";
import {ServicesComponent} from "./pages/dashboard/services/services.component";
import {PricingPlanComponent} from "./pages/dashboard/pricing-plan/pricing-plan.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User List'
        }
      },
      {
        path: 'general-user',
        component: GeneralUserComponent,
        data: {
          title: 'General Users'
        }
      },
      {
        path: 'beautician-user',
        component: BeauticianUserComponent,
        data: {
          title: 'Beautician List'
        }
      },
      {
        path: 'therapists-user',
        component: TherapistsUserComponent,
        data: {
          title: 'Therapists List'
        }
      },
      {
        path: 'beautician-user',
        component: BeauticianUserComponent,
        data: {
          title: 'Beautician List'
        }
      },
      {
        path: 'about-us',
        data: {
          title: 'About Us'
        },
        component: AboutComponent
      },
      {
        path: 'client-reviews',
        data: {
          title: 'Client Reviews'
        },
        component: ClientReviewsComponent
      },
      {
        path: 'services',
        data: {
          title: 'Services'
        },
        component: ServicesComponent
      },
      {
        path: 'prices',
        data: {
          title: 'Pricing'
        },
        component: PricingPlanComponent
      }
    ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
} )
export class AdminPanelRoutingModule { }
