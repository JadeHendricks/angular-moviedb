import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content/content.service';
import { BaseService } from '../../../services/base/base.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Cast } from 'src/app/models/Cast';
import { Content } from 'src/app/models/Content';
import { Review } from 'src/app/models/Review';
import { Video } from 'src/app/models/Video';
import { Reviews } from 'src/app/models/Reviews';
import { Videos } from 'src/app/models/Videos';
import { Contents } from 'src/app/models/Contents';
import { Credits } from 'src/app/models/Credits';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html'
})
export class MovieSummaryComponent implements OnInit {
  
  siteState: string = "";
  id: string;
  content: Content;
  reviews: Review[];
  cast: Cast[];
  videos: Video[];
  similarContent: Content[];
  trailerKey: string;

  constructor(
    private route: ActivatedRoute, 
    private contentService: ContentService, 
    private baseService: BaseService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.baseService.contentState.subscribe((value: string) => {
      this.siteState = value;
      this.siteState ? this.getData() : false;
    })
  }

  getData(): void {
    this.contentService.getContent(this.id).subscribe((movie: Content) => this.content = movie);
    this.contentService.getReviews(this.id).subscribe((review: Reviews) => this.reviews = review.results);
    this.contentService.getCast(this.id).subscribe((cast: Credits) => this.cast = cast.cast.slice(0, 12));
    this.contentService.getVideos(this.id).subscribe((video: Videos) => this.videos = video.results.slice(0, 4));
    this.contentService.getSimilarContent(this.id).subscribe((movie: Contents) => this.similarContent = movie.results);
  }

  backgroundImageUrl(): string {
    if (this.content) {
      return `url(https://image.tmdb.org/t/p/original/${this.content?.backdrop_path})`;
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