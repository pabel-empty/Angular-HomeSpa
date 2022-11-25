import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AppState} from "../app.reducers";
import {exhaustMap, Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  // @ts-ignore
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `${user.token}`,
          }
        });
        return next.handle(modifiedReq);
      })
    )
  }
}
