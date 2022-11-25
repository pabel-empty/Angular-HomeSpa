import { NgModule } from '@angular/core';
import { AppPanelRoutingModule } from './app-panel-routing.module';
import { AppPanelComponent } from './app-panel.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { CommonModule } from '@angular/common';
import { BarberCardComponent } from './components/barber-card/barber-card.component';
import { TestimonialCardComponent } from './components/testimonial-card/testimonial-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiceComponent } from './pages/service/service.component';
import { HomeComponent } from './pages/home/home.component';
import { PricesComponent } from './pages/prices/prices.component';
import { PriceCardComponent } from './components/price-card/price-card.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TherapistsComponent } from './pages/therapists/therapists.component';
import { TherapistsCardComponent } from './components/therapists-card/therapists-card.component';
import { HomeServices } from './store/services/home.services';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {StarRatingModule} from "angular-star-rating";
import {NgxPaginationModule} from "ngx-pagination";
import {PaymentServices} from "../admin-panel/store/services/payment.services";

@NgModule( {
  declarations: [
    AppPanelComponent,
    NavbarComponent,
    BannerComponent,
    SectionTitleComponent,
    ServiceCardComponent,
    BarberCardComponent,
    TestimonialCardComponent,
    ContactFormComponent,
    FooterComponent,
    ServiceComponent,
    HomeComponent,
    PricesComponent,
    PriceCardComponent,
    PaymentGatewayComponent,
    NotFoundPageComponent,
    TherapistsComponent,
    TherapistsCardComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        CarouselModule,
        StarRatingModule.forRoot(),
        AppPanelRoutingModule,
        NgxPaginationModule
    ],
    exports: [
        NavbarComponent
    ],
  providers: [
    HomeServices,
    PaymentServices
  ],
} )
export class AppPanelModule { }
