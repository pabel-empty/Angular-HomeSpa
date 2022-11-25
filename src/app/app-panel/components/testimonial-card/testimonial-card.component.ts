import {Component, Input, OnInit} from '@angular/core';
import {ClientReviewsInterface} from "../../../admin-panel/store/interfaces/client-reviews.interfaces";

@Component({
  selector: 'app-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.css']
})
export class TestimonialCardComponent implements OnInit {

  @Input() review!: ClientReviewsInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
