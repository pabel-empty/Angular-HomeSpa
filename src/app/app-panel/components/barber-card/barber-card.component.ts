import { Component, Input, OnInit } from '@angular/core';

@Component( {
  selector: 'app-barber-card',
  templateUrl: './barber-card.component.html',
  styleUrls: [ './barber-card.component.css' ]
} )
export class BarberCardComponent implements OnInit {

  @Input()
  image!: string;
  @Input()
  title!: string;
  @Input()
  subTitle!: string;
  @Input()
  facebook!: string;
  @Input()
  twitter!: string;
  @Input()
  linkedin!: string;
  @Input()
  dribbble!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
