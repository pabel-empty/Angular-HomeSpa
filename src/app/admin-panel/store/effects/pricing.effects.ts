import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {concatMap, map} from "rxjs/operators";
import {PricingServices} from "../services/pricing.services";
import {
  getCreatePrice,
  getDeletePrice,
  getPricingList,
  getUpdatePrice, setCreatedPrice, setDeletePrice,
  setPricingList,
  setUpdatePrice
} from "../actions/pricing.actions";


@Injectable({
  providedIn: 'root'
})
export class PricingEffects {

  getCreatePrice$ = createEffect(
    () => this.actions$.pipe(
      ofType(getCreatePrice),
      concatMap(({title, planType, plans}) => {
        return this.pricingServices.getCreatePrice(title, planType, plans).pipe(
          map((price) => {
            return setCreatedPrice({price});
          })
        )
      })
    )
  );

  getPricingList$ = createEffect(
    () => this.actions$.pipe(
      ofType(getPricingList),
      concatMap(() => {
        return this.pricingServices.getPricingList().pipe(
          map((response) => {
            return setPricingList({prices: response})
          })
        )
      })
    )
  );

  getUpdatePrice$ = createEffect(
    () => this.actions$.pipe(
      ofType(getUpdatePrice),
      concatMap(({id, state}) => {
        return this.pricingServices.getUpdatePrice(id, state).pipe(
          map((price) => {
            return setUpdatePrice({price})
          })
        )
      })
    )
  );

  getDeletePrice$ = createEffect(
    () => this.actions$.pipe(
      ofType(getDeletePrice),
      concatMap(({id}) => {
        return this.pricingServices.getDeletePrice(id).pipe(
          map((res) => {
            return setDeletePrice({id: id})
          })
        )
      })
    )
  );

  constructor(private actions$: Actions, private pricingServices: PricingServices) {
  }
}
