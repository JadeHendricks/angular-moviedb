import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content/content.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Cast } from 'src/app/models/Cast';
import { Content } from 'src/app/models/Content';
import { Review } from 'src/app/models/Review';
import { Video } from 'src/app/models/Video';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html'
})
export class MovieSummaryComponent implements OnInit {

  id: string;
  movie: Content;
  reviews: Review[];
  cast: Cast[];
  videos: Video[];
  similarMovies: Content[];
  trailerKey: string;

  constructor(
    private route: ActivatedRoute, 
    private contentService: ContentService, 
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.contentService.getMovie(this.id).subscribe(movie => this.movie = movie);
    this.contentService.getReviews(this.id).subscribe(review => this.reviews = review.results);
    this.contentService.getCast(this.id).subscribe(cast => this.cast = cast.cast.slice(0, 12));
    this.contentService.getVideos(this.id).subscribe(video => this.videos = video.results.slice(0, 4));
    this.contentService.getSimilarMovies(this.id).subscribe(movie => this.similarMovies = movie.results);
  }

  backgroundImageUrl(): string {
    if (this.movie) {
      return `url(https://image.tmdb.org/t/p/original/${this.movie?.backdrop_path})`;
    }
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

  getEmbedUrl(video: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video?.key}`);
  }
}