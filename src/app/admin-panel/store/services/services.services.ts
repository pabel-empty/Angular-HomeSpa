import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServicesInterface} from "../interfaces/services.interfaces";

@Injectable({
  providedIn: 'root'
})
export class ServicesServices {
  readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
  }

  getUpdateServiceById(_id: string, title: string, category: string, description: string, state: string, image: File): Observable<ServicesInterface> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category.toLowerCase())
    formData.append('description', description)
    formData.append('image', image);
    formData.append('state', state)
    return this.http.post<ServicesInterface>(`${this.baseUrl}/service/update/by/id/${_id}`, formData);
  }

  addNewService(title: string, category: string, description: string, state: string, image: File): Observable<ServicesInterface> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category.toLowerCase())
    formData.append('description', description)
    formData.append('image', image);
    formData.append('state', state)
    return this.http.post<ServicesInterface>(`${this.baseUrl}/service/create`, formData);
  }

  getTotalServiceCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/service/count`);
  }

  getDeleteService(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/service/delete/by/id/${id}`);
  }

  getServices(page: number, size: number): Observable<ServicesInterface[]> {
    return this.http.get<ServicesInterface[]>(`${this.baseUrl}/service/find/all?page=${page}&size=${size}`);
  }

  getServicesByCategoryName(page: number, size: number, categoryName: string): Observable<ServicesInterface[]> {
    return this.http.get<ServicesInterface[]>(`${this.baseUrl}/service/find/all/by/category/${categoryName}?page=${page}&size=${size}`);
  }

  getSearchedServices(keyword: string, page: number, size: number): Observable<HttpResponse<ServicesInterface[]>> {
    const credentials = {
      keyword: keyword
    }
    return this.http.post<ServicesInterface[]>(`${this.baseUrl}/service/search/keyword?page=${page}&size=${size}`, credentials, { observe: 'response' });
  }

  getUpdateServiceStateById(id: string, state: string): Observable<ServicesInterface> {
    return this.http.post<ServicesInterface>(`${this.baseUrl}/service/update-state/by/id/${id}`, {
      state: state.toUpperCase()
    });
  }

}
