import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/Review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  @Input() userReview: Review;
  public trimmedContent: string = "";

  constructor() { }
  
  ngOnInit(): void {
    if (this.userReview && this.userReview.content) {
      this.contentTrimer(this.userReview.content);
    }
  }

  private contentTrimer(copy: string): void {
    this.trimmedContent = copy.slice(0, 500) + "...";
  }
}
