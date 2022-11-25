import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ClientReviewsServices} from "../services/client-reviews.services";
import {concatMap, map} from "rxjs/operators";
import {
  getClientReviews, getDeleteClientReviewById, getTotalCount,
  getUpdateClientReviewState,
  setClientReviews, setDeleteClientReviewById, setTotalCount,
  setUpdateClientReviewState
} from "../actions/client-reviews.actions";


@Injectable({
  providedIn: 'root'
})
export class ClientReviewsEffects {

  // Get All Client reviews
  getClientReviews$ = createEffect(
    () => this.actions$.pipe(
      ofType( getClientReviews ),
      concatMap( ( { page, size } ) => this.reviewServices.getClientReviews( page, size ).pipe(
        map( reviews => setClientReviews( { reviews } ) ),
      ) ),
    )
  );

  // Get Update Client review state
  getUpdateClientReviewState$ = createEffect(
    () => this.actions$.pipe(
      ofType( getUpdateClientReviewState ),
      concatMap( ( { state, id } ) => this.reviewServices.getUpdateReviewState( state, id ).pipe(
        map( review => setUpdateClientReviewState({ review })),
      ) ),
    )
  );

  // Delete Client Review By ID
  deleteClientReviewById$ = createEffect(
    () => this.actions$.pipe(
      ofType( getDeleteClientReviewById ),
      concatMap( ( { id, } ) => this.reviewServices.deleteClientReviewById( id ).pipe(
        map( confirm => setDeleteClientReviewById({ confirm, id })),
      ) ),
    )
  );

  // Get total count of reviews
  totalCount$ = createEffect(
    () => this.actions$.pipe(
      ofType( getTotalCount ),
      concatMap( () => this.reviewServices.getTotalCount().pipe(
        map( count => setTotalCount({ count })),
      ) ),
    )
  );


  constructor(private actions$: Actions, private reviewServices: ClientReviewsServices) {
  }
}
