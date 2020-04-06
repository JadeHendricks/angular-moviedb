import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  @Input() userReview: any;

  constructor() { }

  ngOnInit(): void {
  }

  contentTrimer(copy: string) {
    return copy.slice(0, 500) + "...";
  }

}
