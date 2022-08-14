import { Component, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { ContentService } from '../../../services/content/content.service'
import { Content } from 'src/app/models/Content';
import { Contents } from 'src/app/models/Contents';
import { Videos } from 'src/app/models/Videos';
import { Genre } from 'src/app/models/Genre';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() content: Content;
  private trailerKey: string;
  public genres: Genre[];
  public backgroundImage: string = '';

  private getTrailerSubscription: Subscription;
  private getGenresSubscription: Subscription;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    if (this.content) {
      this.getBackgroundImageUrl(this.content.backdrop_path);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.content && changes.content.currentValue) {
      this.setGenresArray(changes.content.currentValue);
    }
  }

  public getTrailer(id: number): void {
    this.getTrailerSubscription = this.contentService.getTrailer(id).subscribe((trailer: Videos) => {
      if (trailer) {
        this.trailerKey = trailer.results[0].key;
        if (this.trailerKey) {
          window.open(
            `https://www.youtube.com/watch?v=${this.trailerKey}`,
            `_blank`
          );
        }
      }
    });
  }

  private setGenresArray(content: Content): void {
    this.getGenresSubscription = this.contentService.getGenres().subscribe((value: Contents) => {
      if (value && value.genres && value.genres.length) {
        this.genres = value.genres.filter((element: Genre) => content.genre_ids.includes(element.id)).slice(0, 2);
      }
    });
  }

  private getBackgroundImageUrl(contentBackDrop: string): void {
    if (this.content) {
      this.backgroundImage = `url(https://image.tmdb.org/t/p/original/${contentBackDrop})`;
    }
  }

  ngOnDestroy(): void {
    if (this.getTrailerSubscription) this.getTrailerSubscription.unsubscribe();
    if (this.getGenresSubscription) this.getGenresSubscription.unsubscribe();
  }
}
