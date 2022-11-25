import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import {DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent} from "./containers";
import {
  AvatarModule,
  BadgeModule, BreadcrumbModule, ButtonGroupModule,
  ButtonModule, CardModule,
  DropdownModule,
  FooterModule, FormModule,
  GridModule, HeaderModule, ListGroupModule, NavModule, ProgressModule,
  SidebarModule, TabsModule, UtilitiesModule
} from "@coreui/angular";
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import {Title} from "@angular/platform-browser";
import {UserServices} from "./store/services/user.services";
import {IconModule, IconSetModule, IconSetService} from "@coreui/icons-angular";
import {AboutServices} from "./store/services/about.services";
import {ClientReviewsServices} from "./store/services/client-reviews.services";
import {PaginationService} from "ngx-pagination";
import {ServicesServices} from "./store/services/services.services";
import {PricingServices} from "./store/services/pricing.services";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule( {
  declarations: [
    AdminPanelComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    DefaultLayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SidebarModule,
    TabsModule,
    UtilitiesModule,
    PerfectScrollbarModule,
    ButtonModule,
    IconModule,
    IconSetModule,
  ],
  exports: [],
  providers: [
    UserServices,
    AboutServices,
    ClientReviewsServices,
    PaginationService,
    ServicesServices,
    PricingServices,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    Title,
    IconSetService
  ]

} )
export class AdminPanelModule { }
