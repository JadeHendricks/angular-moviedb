import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from 'src/app/models/Content';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.component.html'
})
export class SearchResultsCardComponent implements OnInit {
  @Input() content: Content;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void { }

  contentTrimer(copy: string): string {
    return copy.length < 200 ? copy : copy.slice(0, 200) + "...";
  }
}
