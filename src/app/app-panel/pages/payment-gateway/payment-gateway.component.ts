import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {PaymentServices} from "../../../admin-panel/store/services/payment.services";
import {Router} from "@angular/router";
import {UserInterface} from "../../../admin-panel/store/interfaces/user.interfaces";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducers";
import {PopupBoxDirective} from "../../../shared/directives/popup-box.directive";
import {AuthFormComponent} from "../../../auth/auth-form/auth-form.component";
import {Subscription} from "rxjs";
import {CardFormComponent} from "../../../shared/components/card-form/card-form.component";
import jwt_decode from "jwt-decode";
import {getNewCreatedPaymentCardInfo} from "../../../admin-panel/store/selectors/payment.selectors";

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
  // Decorate the child component with the directive
  @ViewChild( PopupBoxDirective ) popupBoxRef!: PopupBoxDirective;
  appointmentUserInfo!: any;
  beauticianAvailableDate!: string;
  beauticianInfo!: UserInterface;
  submitted: boolean = false;
  visaCardInformation!: any;
  loadingForPaymentGettingPaymentInfo: boolean = true;
  popupBoxSubscription!: Subscription;

  constructor(private paymentService: PaymentServices, private router: Router, private store: Store<AppState>, private componentFactoryResolver: ComponentFactoryResolver) {
    this.appointmentUserInfo  = this.router.getCurrentNavigation()!.extras.state!['appointmentUserInfo'];
    this.beauticianAvailableDate = this.router.getCurrentNavigation()!.extras.state!['beauticianAvailableDate'];
    this.beauticianInfo = this.router.getCurrentNavigation()!.extras.state!['beauticianInfo'];

  }


  ngOnInit(): void {
    window.scroll(0,0);

    // @ts-ignore
    const userToken = JSON.parse(localStorage.getItem('user')).token
    // @ts-ignore
    const decodeToken = jwt_decode(userToken);
    // @ts-ignore
    this.paymentService.getPaymentInfo(decodeToken.id).subscribe(information => {
      console.log(information)
      setTimeout(() => {
        if(information === null){
          this.loadingForPaymentGettingPaymentInfo = false;
          this.payment_card();
        }else{
          this.visaCardInformation = information;
          this.loadingForPaymentGettingPaymentInfo = false;
        }
      }, 2000)
    });

    this.store.select(getNewCreatedPaymentCardInfo).subscribe(cardInfo => {
      if(cardInfo !== null){
        this.visaCardInformation = cardInfo;
      }
    });
  }

  paymentSubmit() {
    let name = this.appointmentUserInfo.name;
    let email = this.appointmentUserInfo.email;
    let address = this.appointmentUserInfo.address;
    let gender = this.appointmentUserInfo.gender;
    let cardName = this.visaCardInformation.cardName;
    let cardNumber = this.visaCardInformation.cardNumber;
    let convertedYear = `20${this.visaCardInformation.cardExpYear}`
    let cardExpYear = +convertedYear;
    let cardExpMonth = this.visaCardInformation.cardExpMonth;
    let cardCvc = this.visaCardInformation.cardCvc;
    let beauticianEmail = this.beauticianInfo.email;
    let beauticianName = `${this.beauticianInfo.firstName} ${this.beauticianInfo.lastName}`;
    this.paymentService.createCustomer(name, email, address, gender, cardName, cardNumber, cardExpYear, cardExpMonth, cardCvc, beauticianEmail, beauticianName).subscribe(info => {
      this.submitted = true;
    });
  }

  backToHomePage(){
    this.submitted = false;
    this.router.navigate(['/home']);
  }

  payment_card() {
    const popupBoxComponent = this.componentFactoryResolver.resolveComponentFactory( CardFormComponent );
    const viewContainerRef = this.popupBoxRef.viewContainerRef;

    viewContainerRef.clear();
    const containerRef = viewContainerRef.createComponent( popupBoxComponent );

    this.popupBoxSubscription = containerRef.instance.closePopup.subscribe( () => {
      this.popupBoxSubscription.unsubscribe();
      viewContainerRef.clear();
    } );
  }


}
