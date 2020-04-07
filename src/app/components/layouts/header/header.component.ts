import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Content } from 'src/app/models/Content';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() content: Content;
  trailerKey: string;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {}

  getTrailer(id: number): void {
    this.movieService.getTrailer(id).subscribe(trailer => {
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
