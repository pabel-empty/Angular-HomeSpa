import { Component, OnInit } from '@angular/core';
import {PricingInterface} from "../../../admin-panel/store/interfaces/pricing.interfaces";
import * as PricingActions from "../../../admin-panel/store/actions/pricing.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import {getAllPricingList} from "../../../admin-panel/store/selectors/pricing.selectors";

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  prices: PricingInterface[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(PricingActions.getPricingList());
    this.store.select(getAllPricingList).subscribe(prices => {
      this.prices = prices;
    });
  }

}
