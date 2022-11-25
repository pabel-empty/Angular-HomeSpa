import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, concatMap, tap, mergeMap, catchError } from 'rxjs/operators';
import { getServices, setServices } from '../actions/home.actions';
import { HomeServices } from '../services/home.services';


@Injectable( { providedIn: 'root' } )
export class HomeEffects {

  getServices$ = createEffect(
    () => this.actions$.pipe(
      ofType( getServices ),
      concatMap( ( { page, size } ) => this.homeServices.getServices( page, size ).pipe(
        map( services => setServices( { services: services } ) ),
      ) ),
    )
  );


  constructor( private actions$: Actions, private homeServices: HomeServices ) { }

}




