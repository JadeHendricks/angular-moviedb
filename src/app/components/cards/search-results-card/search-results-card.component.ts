import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.component.html'
})
export class SearchResultsCardComponent implements OnInit {
  @Input() content: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void { }

  contentTrimer(copy: string) {
    return copy.slice(0, 200) + "...";
  }
}
