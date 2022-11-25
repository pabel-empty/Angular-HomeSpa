import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MyAccountComponent} from "./my-account.component";
import {RouterModule} from "@angular/router";
import {MyAccountRoutingModule} from "./my-account-routing.module";

@NgModule( {
  declarations: [
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MyAccountRoutingModule
  ],
  providers: [

  ],
} )
export class MyAccountModule { }
