import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plan, PricingInterface} from "../interfaces/pricing.interfaces";


@Injectable({
  providedIn: 'root'
})
export class PricingServices {

  readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
  }

  getCreatePrice(title: string, planType: string, plans: Plan[]): Observable<PricingInterface> {
    const credentials = {
      title: title,
      planType: planType,
      plans: plans
    }
    return this.http.post<PricingInterface>(`${this.baseUrl}/price-plan/create`, credentials);
  }

  getPricingList(): Observable<PricingInterface[]> {
    return this.http.get<PricingInterface[]>(`${this.baseUrl}/price-plan/find/all`);
  }

  getUpdatePrice(id: string, state: string): Observable<PricingInterface> {
    const newState = {
      state: state.toUpperCase()
    }
    return this.http.post<PricingInterface>(`${this.baseUrl}/price-plan/update/state/by/id/${id}`, newState);
  }

  getDeletePrice(id: string): Observable<true> {
    return this.http.delete<true>(`${this.baseUrl}/price-plan/delete/by/id/${id}`);
  }


}
