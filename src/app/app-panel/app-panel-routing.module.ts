import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPanelComponent } from './app-panel.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';
import { PricesComponent } from './pages/prices/prices.component';
import { ServiceComponent } from './pages/service/service.component';
import { TherapistsComponent } from './pages/therapists/therapists.component';

const routes: Routes = [
  {
    path: '', component: AppPanelComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'services', component: ServiceComponent },
      { path: 'prices', component: PricesComponent },
      { path: 'payment', component: PaymentGatewayComponent },
      { path: 'therapists', component: TherapistsComponent },
    ]
  },
  { path: 'my-account', loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountModule) },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AppPanelRoutingModule { }
