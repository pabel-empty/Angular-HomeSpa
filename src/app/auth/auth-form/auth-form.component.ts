import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducers";
import {GetLogin, GetUserSignUp} from "../store/auth.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  @Output() closePopup = new EventEmitter<void>();

  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    firstName: new FormControl('', [
      Validators.minLength(3),
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.minLength(3),
      Validators.required
    ]),
    username: new FormControl('', [
      Validators.minLength(3),
      Validators.required
    ])
  })
  public gender: string = 'male';
  public userType: string = 'user';
  public isLoginSide = true;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(auth => {
      if(auth.userCreated){
        this.isLoginSide = true;
      }
    })
  }

  close(): void {
    this.closePopup.emit();
  }

  toggleLoginSide( identify: string ): void {
    this.isLoginSide = identify === 'LOGIN' ? true : false;
  }

  onItemChange(item: any) {
    this.gender = item.target.value;
  }

  onSubmit() {
    this.store.dispatch(
      new GetLogin({email: this.form.value.email, password: this.form.value.password})
    )
    this.router.navigate(['/home'])
  }

  signUpForm():void {
    const {lastName,firstName,email,password,username} = this.form.value;
    if(this.form.valid){
      this.store.dispatch(
        new GetUserSignUp({
          userType: this.userType,
          username: username,
          gender:this.gender,
          email: email,
          password: password,
          lastName: lastName,
          firstName: firstName
        })
      )
    }
  }

}
