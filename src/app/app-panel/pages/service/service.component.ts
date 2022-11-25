import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookAppointmentComponent } from 'src/app/shared/components/book-appointment/book-appointment.component';
import { PopupBoxDirective } from 'src/app/shared/directives/popup-box.directive';
import {ServicesInterface} from "../../../admin-panel/store/interfaces/services.interfaces";
import * as ServicesActions from "../../../admin-panel/store/actions/services.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import {getServices, getTotalServiceCount} from "../../../admin-panel/store/selectors/services.selectors";
import {PaginationInstance} from "ngx-pagination";

@Component( {
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: [ './service.component.css' ]
} )
export class ServiceComponent implements OnInit {

  // Decorate the child component with the directive
  @ViewChild( PopupBoxDirective ) popupBoxRef!: PopupBoxDirective;

  // this is the all other properties of the component
  private popupBoxSubscription!: Subscription;
  services: ServicesInterface[] = [];//Pagination
  config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 30,
    currentPage: 1,
    totalItems: 0
  };

  constructor( public componentFactoryResolver: ComponentFactoryResolver, private store: Store<AppState>) { }

  ngOnInit(): void {
    // Dispatch Actions
    this.store.dispatch(ServicesActions.getServices({page: 1, size: 30}));

    this.store.select(getServices).subscribe(services => {
      this.services = services
    });
    this.store.select(getTotalServiceCount).subscribe(count => {
      this.config.totalItems = count;
    })
  }

  openPopupBox(serviceId: string): void {
    const popupBoxComponent = this.componentFactoryResolver.resolveComponentFactory( BookAppointmentComponent );
    const viewContainerRef = this.popupBoxRef.viewContainerRef;

    viewContainerRef.clear();
    const containerRef = viewContainerRef.createComponent( popupBoxComponent );

    this.popupBoxSubscription = containerRef.instance.closePopup.subscribe( () => {
      this.popupBoxSubscription.unsubscribe();
      viewContainerRef.clear();
    } );
  }

  onPageChange(event: number) {
    this.store.dispatch(ServicesActions.getServices({
      page: event, size: this.config.itemsPerPage
    }));
  }

}
