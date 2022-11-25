import {LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupBoxDirective } from './directives/popup-box.directive';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { BookAppointmentFormComponent } from './components/book-appointment-form/book-appointment-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UsersViewComponent } from './components/users-view/users-view.component';
import * as moment from 'moment';
// import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {
  ButtonGroupModule,
  ButtonModule, GridModule,
  ListGroupModule,
  ModalModule, NavModule,
  PaginationModule, PlaceholderModule,
  TableModule,
  TabsModule,
  UtilitiesModule
} from "@coreui/angular";
import {RouterModule} from "@angular/router";
import { CardFormComponent } from './components/card-form/card-form.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";


// @ts-ignore
// @ts-ignore
@NgModule( {
  declarations: [
    PopupBoxDirective,
    BookAppointmentComponent,
    BookAppointmentFormComponent,
    UsersViewComponent,
    CardFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavModule,
    RouterModule,
    TabsModule,
    ButtonModule,
    ButtonGroupModule,
    TableModule,
    UtilitiesModule,
    ModalModule,
    PaginationModule,
    ListGroupModule,
    PlaceholderModule,
    GridModule,
    FormsModule,
    // NgbModalModule,
    // FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    PopupBoxDirective,
    BookAppointmentComponent,
    BookAppointmentFormComponent,
    ReactiveFormsModule,
    UsersViewComponent,
    TabsModule,
    ButtonModule,
    ButtonGroupModule,
    TableModule,
    UtilitiesModule,
    ModalModule,
    PaginationModule,
    ListGroupModule,
    PlaceholderModule,
    GridModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],

} )
export class SharedModule { }
