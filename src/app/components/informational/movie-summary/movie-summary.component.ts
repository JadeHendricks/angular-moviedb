import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Cast } from 'src/app/models/Cast';
import { Content } from 'src/app/models/Content';
import { Review } from 'src/app/models/Review';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html'
})
export class MovieSummaryComponent implements OnInit {

  id: string;
  movie: Content;
  reviews: Review[];
  cast: Cast[];
  videos: any;
  similarMovies: Content[];
  trailerKey: string;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService, 
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.movieService.getMovie(this.id).subscribe(movie => this.movie = movie);
    this.movieService.getReviews(this.id).subscribe(review => this.reviews = review.results);
    this.movieService.getCast(this.id).subscribe(cast => this.cast = cast.cast.slice(0, 12));
    this.movieService.getVideos(this.id).subscribe(video => this.videos = video.results.slice(0, 4));
    this.movieService.getSimilarMovies(this.id).subscribe(movie => this.similarMovies = movie.results);
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

  getEmbedUrl(video: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video?.key}`);
  }
}