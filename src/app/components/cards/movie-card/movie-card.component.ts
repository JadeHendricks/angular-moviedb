import { Component, OnInit, Input } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent implements OnInit {

  @Input() content: Content;
  trailerKey: string;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

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
}
