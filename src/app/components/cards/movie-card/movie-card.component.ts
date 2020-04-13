import { Component, OnInit, Input } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent implements OnInit {

  @Input() content: Content;
  trailerKey: string;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  getTrailer(id: number): void {
    this.contentService.getTrailer(id).subscribe(trailer => {
      this.trailerKey = trailer.results[0].key
      if (this.trailerKey) {
        window.open(
          `https://www.youtube.com/watch?v=${this.trailerKey}`,
          `_blank`
        );
      }
    });
  }
}
