import { Component, OnInit, Input } from '@angular/core';
import { Content } from 'src/app/models/Content';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.component.html'
})
export class SearchResultsCardComponent implements OnInit {
  @Input() content: Content;
  public trimmedContent: string = "";

  constructor() { }

  ngOnInit(): void { 
    this.contentTrimer(this.content.overview);
  }

  private contentTrimer(copy: string): void {
    if (copy) {
      this.trimmedContent = copy.length < 200 ? copy : copy.slice(0, 200) + "...";
    }
  }
}
