import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ContentService } from '../../../services/content/content.service'
import { Content } from 'src/app/models/Content';
import { Contents } from 'src/app/models/Contents';
import { Videos } from 'src/app/models/Videos';
import { Genre } from 'src/app/models/Genre';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  
  @Input() content: Content;
  trailerKey: string;
  genres: Genre[];

  constructor(private contentService: ContentService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.content.currentValue) { 
      this.setGenresArray(changes.content.currentValue);
    }
  }

  getTrailer(id: number): void {
    this.contentService.getTrailer(id).subscribe((trailer: Videos) => {
      this.trailerKey = trailer.results[0].key
      if (this.trailerKey) {
        window.open(
          `https://www.youtube.com/watch?v=${this.trailerKey}`,
          `_blank`
        );
      }
    });
  }

  setGenresArray(content: Content): void {
    this.contentService.getGenres().subscribe((value: Contents) => {
      this.genres = value.genres.filter((element: Genre) => content.genre_ids.includes(element.id)).slice(0, 2);
    });
  }

  backgroundImageUrl(): string {
    if (this.content) {
      return `url(https://image.tmdb.org/t/p/original/${this.content?.backdrop_path})`;
    }
 }
}
