import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducers";
import * as PricingActions from '../../../store/actions/pricing.actions';
import {Observable} from "rxjs";
import {Plan, PricingInterface} from "../../../store/interfaces/pricing.interfaces";
import {getAllPricingList} from "../../../store/selectors/pricing.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {

  pricingTypes = [
    'BASIC',
    'STANDARD',
    'PREMIUM'
  ];
  selectedDeleteItem!: string;
  addPricingVisible: boolean = false;
  deletePricingVisible: boolean = false;
  editPriceVisible: boolean = false;
  prices: PricingInterface[] = [];
  isEditable: boolean = false;
  refreshLoadingSpinner: boolean = false;
  pricingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    planType: new FormControl('', Validators.required),
    firstPlanTitle: new FormControl('', Validators.required),
    firstPlanDescription: new FormControl('', Validators.required),
    firstPlanPrice: new FormControl('', Validators.required),
    secondPlanTitle: new FormControl('', Validators.required),
    secondPlanDescription: new FormControl('', Validators.required),
    secondPlanPrice: new FormControl('', Validators.required),
    thirdPlanTitle: new FormControl('', Validators.required),
    thirdPlanDescription: new FormControl('', Validators.required),
    thirdPlanPrice: new FormControl('', Validators.required),
  })
  loadingSpinnerService: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(PricingActions.getPricingList());
    this.store.select(getAllPricingList).subscribe(prices => {
      this.clearSubmitForm();
      this.refreshLoadingSpinner = false;
      this.addPricingVisible = false;
      this.deletePricingVisible = false;
      this.prices = prices;
    });
  }

  updateToActive(price: PricingInterface) {
    this.store.dispatch(PricingActions.getUpdatePrice({state: 'Active', id: price._id}));
  }

  updateToInactive(price: PricingInterface) {
    this.store.dispatch(PricingActions.getUpdatePrice({state: 'Inactive', id: price._id}));
  }


  openDeletePopup(price: PricingInterface) {
    this.deletePricingVisible = true;
    this.selectedDeleteItem = price._id;
  }

  showNewPricingAddPopupEvent() {
    this.addPricingVisible = true;
  }

  clickToRefreshLoadedService() {
    this.refreshLoadingSpinner = true;
    this.store.dispatch(PricingActions.getPricingList());
  }

  pricingVisibleChange($event: boolean) {
    this.addPricingVisible = $event;
  }

  closePricingVisiblePopup() {
    this.addPricingVisible = false;
  }

  submitNewPrice() {
    if(this.pricingForm.invalid){
      return;
    }
    const pricePlan = [
      {
        title: this.pricingForm.value.firstPlanTitle!,
        price: +this.pricingForm.value.firstPlanPrice!,
        description: this.pricingForm.value.firstPlanDescription!
      },
      {
        title: this.pricingForm.value.secondPlanTitle!,
        price: +this.pricingForm.value.secondPlanPrice!,
        description: this.pricingForm.value.secondPlanDescription!
      },
      {
        title: this.pricingForm.value.thirdPlanTitle!,
        price: +this.pricingForm.value.thirdPlanPrice!,
        description: this.pricingForm.value.thirdPlanDescription!
      }
    ]
    this.store.dispatch(PricingActions.getCreatePrice({
      title: this.pricingForm.value.title!,
      planType: this.pricingForm.value.planType!,
      plans: pricePlan
    }))
  }


  clearSubmitForm() {
    this.pricingForm.reset();
  }

  deleteVisibleChange($event: boolean) {
    this.deletePricingVisible = $event;
  }

  closeDeletePopup() {
    this.deletePricingVisible = false;
  }

  permanentlyDelete() {
    this.store.dispatch(PricingActions.getDeletePrice({id: this.selectedDeleteItem}));
  }


}
