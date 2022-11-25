import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from "../../../admin-panel/store/interfaces/user.interfaces";

@Component({
  selector: 'app-therapists-card',
  templateUrl: './therapists-card.component.html',
  styleUrls: ['./therapists-card.component.css']
})
export class TherapistsCardComponent implements OnInit {

  @Input() user!: UserInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
