import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ServicesServices} from "../services/services.services";
import {
  addNewService,
  getDeleteService, getSearchedServices,
  getServices, getServicesByCategoryName, getTotalCount, getUpdateServiceById,
  getUpdateServiceStateById, setDeleteService, setNewService, setSearchedServices,
  setServices, setServicesByCategoryName, setTotalCount, setUpdateServiceById,
  setUpdateServiceStateById
} from "../actions/services.actions";
import {concatMap, map} from "rxjs/operators";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicesEffects {

  addNewService$ = createEffect(
    () => this.actions$.pipe(
      ofType(addNewService),
      concatMap(({title, state, image, description, category}) => {
        return this.services.addNewService(title, category, description, state, image).pipe(
          map((service) => setNewService({service}))
        )
      })
    )
  );

  getUpdateServiceById$ = createEffect(
    () => this.actions$.pipe(
      ofType(getUpdateServiceById),
      concatMap(({title, state, image, description, category, _id}) => {
        return this.services.getUpdateServiceById(_id, title, category, description, state, image).pipe(
          map((service) => setUpdateServiceById({service}))
        )
      })
    )
  );

  getServices$ = createEffect(
    () => this.actions$.pipe(
      ofType(getServices),
      concatMap(({page, size}) => {
        return this.services.getServices(page, size).pipe(
          map((services) => {
            let checkedServices = services !== null ? services : [];
            return setServices({services: checkedServices});
          })
        )
      })
    )
  );


  getServicesByCategoryName$ = createEffect(
    () => this.actions$.pipe(
      ofType(getServicesByCategoryName),
      concatMap(({page, size, categoryName}) => {
        return this.services.getServicesByCategoryName(page, size, categoryName).pipe(
          map((services) => {
            let checkedServices = services !== null ? services : [];
            return setServicesByCategoryName({services: checkedServices})
          })
        )
      })
    )
  );

  getSearchedServices$ = createEffect(
    () => this.actions$.pipe(
      ofType(getSearchedServices),
      concatMap(({page, size, keyword}) => {
        return this.services.getSearchedServices(keyword, page, size).pipe(
          map((response) => {
            const totalCount = response.headers.get('x-total-count');
            console.log(totalCount);
            return setSearchedServices({
              services: response.body === null ? [] : response.body,
              count: +totalCount!
            })
          })
        )
      })
    )
  );

  getTotalServiceCount = createEffect(
    () => this.actions$.pipe(
      ofType(getTotalCount),
      concatMap(() => {
        return this.services.getTotalServiceCount().pipe(
          map((count) => setTotalCount({count}))
        )
      })
    )
  );

  getDeleteService$ = createEffect(
    () => this.actions$.pipe(
      ofType(getDeleteService),
      concatMap(({id}) => {
        return this.services.getDeleteService(id).pipe(
          map((message) => setDeleteService({message: message, id}))
        )
      })
    )
  );


  getUpdateServiceStateById$ = createEffect(
    () => this.actions$.pipe(
      ofType(getUpdateServiceStateById),
      concatMap(({id,state}) => {
        return this.services.getUpdateServiceStateById(id, state).pipe(
          map((service) => setUpdateServiceStateById({service}))
        )
      })
    )
  );

  constructor(private actions$: Actions, private services: ServicesServices) {
  }
}
