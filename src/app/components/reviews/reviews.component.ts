import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/Review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  @Input() userReview: Review;

  constructor() { }

  ngOnInit(): void {
  }

  contentTrimer(copy: string): string {
    return copy.slice(0, 500) + "...";
  }

}
