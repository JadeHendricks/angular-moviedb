import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Content } from 'src/app/models/Content';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent implements OnInit, OnDestroy {

  @Input() content: Content;
  private trailerKey: string;
  private getTrailerSubscription: Subscription;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
  }

  public getTrailer(id: number): void {
    this.getTrailerSubscription = this.contentService.getTrailer(id).subscribe(trailer => {
      this.trailerKey = trailer.results[0].key
      if (this.trailerKey) {
        window.open(
          `https://www.youtube.com/watch?v=${this.trailerKey}`,
          `_blank`
        );
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.getTrailerSubscription) this.getTrailerSubscription.unsubscribe();
  }
}
