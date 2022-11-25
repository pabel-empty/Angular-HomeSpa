import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookAppointmentComponent } from 'src/app/shared/components/book-appointment/book-appointment.component';
import { PopupBoxDirective } from 'src/app/shared/directives/popup-box.directive';
import {createSelector, select, Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import * as ServicesActions from "../../../admin-panel/store/actions/services.actions";
import {PaginationInstance} from "ngx-pagination";
import {
  getServices,
  getTotalServiceCount,
  servicesFeatureSelectors
} from "../../../admin-panel/store/selectors/services.selectors";
import {ServicesInterface} from "../../../admin-panel/store/interfaces/services.interfaces";
import {getAbout} from "../../../admin-panel/store/selectors/about.selectors";
import {AboutInterface} from "../../../admin-panel/store/interfaces/about.interfaces";
import * as AboutActions from "../../../admin-panel/store/actions/about.actions";
import * as ClientreviewsActions from "../../../admin-panel/store/actions/client-reviews.actions";
import * as ServiceActions from "../../../admin-panel/store/actions/services.actions";
import * as UserActions from "../../../admin-panel/store/actions/user.actions";
import {
  getAllUsers, getBeauticianUsers,
  getTotalBeauticianUsers,
  getTotalGeneralUsers,
} from "../../../admin-panel/store/selectors/user.selectors";
import {getClientReviews, getTotalReviewCount} from "../../../admin-panel/store/selectors/client-reviews.selectors";
import {UserInterface} from "../../../admin-panel/store/interfaces/user.interfaces";
import * as ClientReviewsActions from "../../../admin-panel/store/actions/client-reviews.actions";
import {ClientReviewsInterface} from "../../../admin-panel/store/interfaces/client-reviews.interfaces";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
} )
export class HomeComponent implements OnInit {

  // Decorate the child component with the directive
  @ViewChild( PopupBoxDirective ) popupBoxRef!: PopupBoxDirective;

  // this is the all other properties of the component
  private popupBoxSubscription!: Subscription;
  loadingSpinnerService: boolean = false;
  services: ServicesInterface[] = [];
  about: AboutInterface[] = [];
  selectedCategory: string = 'all';
  totalGeneralUserCount: number = 0;
  totalBeauticianUserCount: number = 0;
  totalClientReviewCount: number = 0;
  totalServiceCount: number = 0;
  beauticians!: UserInterface[];
  reviews: ClientReviewsInterface[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: false
  }

  constructor( public componentFactoryResolver: ComponentFactoryResolver, private store: Store<AppState>) { }

  ngOnInit(): void {
    // Dispatch Actions
    this.store.dispatch(ServicesActions.getServices({page: 1, size: 6}));
    this.store.dispatch(AboutActions.getAbout());
    this.store.dispatch(AboutActions.getSocialLinks());
    this.store.dispatch(ClientreviewsActions.getTotalCount());
    this.store.dispatch(ServiceActions.getTotalCount());
    this.store.dispatch(UserActions.getCountGeneralUsers());
    this.store.dispatch(UserActions.getCountBeauticianUsers());
    this.store.dispatch(UserActions.getBeauticianUsers({page: 1, size: 3}));
    this.store.dispatch(ClientReviewsActions.getClientReviews({size: 10, page: 1}));


    this.store.select(getTotalReviewCount).subscribe(count => {this.totalClientReviewCount = count});
    this.store.select(getTotalServiceCount).subscribe(count => {this.totalServiceCount = count});
    this.store.select(getTotalGeneralUsers).subscribe(count => {this.totalGeneralUserCount = count});
    this.store.select(getTotalBeauticianUsers).subscribe(count => {this.totalBeauticianUserCount = count});
    this.store.select(getAbout).subscribe(about => {this.about = about;});
    this.store.select(getServices).subscribe(services => {
      this.loadingSpinnerService = false;
      this.services = services
    });
    // @ts-ignore
    this.store.pipe(select(getBeauticianUsers)).subscribe((beauticians) => {
      this.beauticians = beauticians;
    })
    this.store.select(getClientReviews).subscribe(reviews => {
      this.reviews = reviews;
    });
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


  allServices(){
    this.store.dispatch(ServicesActions.getServices({
      page: 1, size: 9
    }));
    this.selectedCategory = 'all'
  }

  getHairStyle() {
    this.store.dispatch(ServicesActions.getServicesByCategoryName({
      page: 1, size: 9, categoryName: 'Hair'
    }));
    this.selectedCategory = 'Hair'
  }

  waxing() {
    this.store.dispatch(ServicesActions.getServicesByCategoryName({
      page: 1, size: 9, categoryName: 'waxing'
    }));
    this.selectedCategory = 'waxing'
  }

  threading() {
    this.store.dispatch(ServicesActions.getServicesByCategoryName({
      page: 1, size: 9, categoryName: 'threading'
    }));
    this.selectedCategory = 'threading'
  }

  rebounding() {
    this.store.dispatch(ServicesActions.getServicesByCategoryName({
      page: 1, size: 9, categoryName: 'rebounding'
    }));
    this.selectedCategory = 'rebounding'
  }

  partyMackUp() {
    this.store.dispatch(ServicesActions.getServicesByCategoryName({
      page: 1, size: 9, categoryName: 'party-mackUp'
    }));
    this.selectedCategory = 'party-mackUp'
  }

  laserTreatment() {
    this.store.dispatch(ServicesActions.getServicesByCategoryName({
      page: 1, size: 9, categoryName: 'laser-treatment'
    }));
    this.selectedCategory = 'laser-treatment'
  }

  facial() {
    this.store.dispatch(ServicesActions.getServicesByCategoryName({
      page: 1, size: 9, categoryName: 'facial'
    }));
    this.selectedCategory = 'facial'
  }
}
