import { Component, OnInit, Input } from '@angular/core';
import { ContentService } from '../../../services/content/content.service'
import { Content } from 'src/app/models/Content';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() content: Content;
  trailerKey: string;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {}

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

  backgroundImageUrl(): string {
    if (this.content) {
      return `url(https://image.tmdb.org/t/p/original/${this.content?.backdrop_path})`;
    }
 }
}
