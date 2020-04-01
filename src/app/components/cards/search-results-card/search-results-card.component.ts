import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.component.html'
})
export class SearchResultsCardComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.snapshot.paramMap.get("id");
  }

}
