import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientReviewsInterface} from "../interfaces/client-reviews.interfaces";


@Injectable({
  providedIn: 'root'
})
export class ClientReviewsServices {

  readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
  }

  // Get Client Reviews
  getClientReviews(page: number, size: number): Observable<ClientReviewsInterface[]> {
    return this.http.get<ClientReviewsInterface[]>(`${this.baseUrl}/clients-review/find/all?page=${page}&size=${size}`);
  }

  // Get Update Review state
  getUpdateReviewState(state: string, id: string): Observable<ClientReviewsInterface> {
    return this.http.post<ClientReviewsInterface>(`${this.baseUrl}/clients-review/update/state/by/id/${id}`, {state: state.toUpperCase()});
  }

  // Delete Client Review By Id
  deleteClientReviewById(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/clients-review/delete/by/id/${id}`);
  }

  // Get total count of reviews
  getTotalCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/clients-review/total-count`);
  }



}



