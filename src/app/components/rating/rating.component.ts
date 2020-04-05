import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  
  constructor() { }

  ngOnInit(): void {
  }

  setRatingTheme(rating: number): string {
    return rating < 5 ? "ratingholder ratingholder--red" : rating > 5 && rating < 7 ? "ratingholder ratingholder--orange" : "ratingholder";
  }

}
