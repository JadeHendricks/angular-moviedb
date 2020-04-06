import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html'
})
export class MovieSummaryComponent implements OnInit {

  movie: any;
  reviews: any;
  cast: any;
  videos: any;
  similarMovies: any;
  trailerKey: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.movieService.getMovie(id).subscribe(movie => this.movie = movie);
    this.movieService.getReviews(id).subscribe(review => this.reviews = review.results);
    this.movieService.getCast(id).subscribe(cast => this.cast = cast.cast.slice(0, 12));
    this.movieService.getVideos(id).subscribe(video => this.videos = video.results.slice(0, 4));
    this.movieService.getSimilarMovies(id).subscribe(movie => this.similarMovies = movie.results);
  }

  backgroundImageUrl(): string {
    if (this.movie) {
      return `url(https://image.tmdb.org/t/p/original/${this.movie?.backdrop_path})`;
    }
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

getEmbedUrl(video: any) {
  return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video?.key}`);
}
}