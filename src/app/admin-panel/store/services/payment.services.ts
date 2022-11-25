import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PaymentInterfaces} from "../interfaces/payment.interfaces";


@Injectable({
  providedIn: 'root'
})
export class PaymentServices {

  readonly baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
  }

  // Create Customer
  createCustomer(name: string, email: string, address:string, gender: string, cardName: string, cardNumber: string, cardExpYear: number, cardExpMonth: number, cardCvc: string, beauticianEmail: string, beauticianName:string) {
    const customerCredentials = {
      name,
      email,
      address,
      gender,
      cardName,
      cardNumber,
      cardExpYear,
      cardExpMonth,
      cardCvc,
      beauticianEmail,
      beauticianName,
    }
    return this.http.post(`${this.baseUrl}/payment-gateway/create-customer`, customerCredentials);
  }

  getPaymentInfo(userId: string): Observable<PaymentInterfaces | boolean> {
    return this.http.get<PaymentInterfaces | boolean>(`http://localhost:5000/api/v1/payment-gateway/card-info/by/user-id/${userId}`);
  }

  getCreateCardInformation(userId: string,
                           cardName: string,
                           cardNumber: number,
                           cardExpYear: number,
                           cardExpMonth: number,
                           cardCvc: number): Observable<PaymentInterfaces> {
    const cardCredentials = {
      userId,
      cardName,
      cardNumber,
      cardExpYear,
      cardExpMonth,
      cardCvc
    }
    return this.http.post<PaymentInterfaces>(`http://localhost:5000/api/v1/payment-gateway/add-card-info`, cardCredentials);
  }


}
