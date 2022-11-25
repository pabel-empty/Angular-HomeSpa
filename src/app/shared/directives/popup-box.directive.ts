import { Directive, ViewContainerRef } from '@angular/core';

@Directive( {
  selector: '[appPopupBox]'
} )
export class PopupBoxDirective {

  constructor( public viewContainerRef: ViewContainerRef ) { }

}
