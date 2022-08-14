import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content/content.service';
import { BaseService } from '../../../services/base/base.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Cast } from 'src/app/models/Cast';
import { Content } from 'src/app/models/Content';
import { Review } from 'src/app/models/Review';
import { Video } from 'src/app/models/Video';
import { Contents } from 'src/app/models/Contents';
import { Genre } from 'src/app/models/Genre';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html'
})
export class MovieSummaryComponent implements OnInit, OnDestroy {
  
  private siteState: string = "";
  private trailerKey: string = "";
  
  public id: string = "";
  public backgroundImage: string = "";
  public content: Content;
  public reviews: Review[];
  public cast: Cast[];
  public videos: Video[];
  public similarContent: Content[];
  public genres: Genre[];

  private contentStateSubscription: Subscription;
  private getGenresSubscription: Subscription;
  private getTrailerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private contentService: ContentService, 
    private baseService: BaseService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.registerSubscriptions();
  }

  private registerSubscriptions(): void {
    this.getContentState();
  }

  private getContentState(): void {
    this.contentStateSubscription = this.baseService.contentState.subscribe((value: string) => {
      if (value) {
        this.siteState = value;
        this.siteState ? this.getData() : false;
      }
    });
  }

  private setGenresArray(content: Content): void {
    this.getGenresSubscription = this.contentService.getGenres().subscribe((value: Contents) => {
      if (value && Object.keys(value).length) {
        this.genres = value.genres.filter((genreOne: Genre) => content.genres.find(genreTwo => genreOne.id === genreTwo.id)).slice(0, 2);
      }
    });
  }

  private getData(): void {
    forkJoin([
      this.contentService.getContent(this.id),
      this.contentService.getReviews(this.id),
      this.contentService.getCast(this.id),
      this.contentService.getVideos(this.id),
      this.contentService.getSimilarContent(this.id)
    ]).subscribe(([content, reviews, cast, videos, similarContent]) => {
      this.setMovieSummaryValues(content, reviews, cast, videos, similarContent);
      this.setGenresArray(this.content);
      this.getBackgroundImageUrl(this.content);
    });
  }

  private setMovieSummaryValues(content, reviews, cast, videos, similarContent): void {
    this.reviews = reviews.results;
    this.cast = cast.cast.slice(0, 12);
    this.videos = videos.results.slice(0, 4);
    this.similarContent = similarContent.results;
    this.content = content;
  }

  private getBackgroundImageUrl(content: Content): void {
    if (this.content) {
      this.backgroundImage = `url(https://image.tmdb.org/t/p/original/${content?.backdrop_path})`
    }
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

  public getEmbedUrl(video: any): SafeResourceUrl {
    if (video) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video?.key}`);
    } 
  }

  ngOnDestroy(): void {
    if (this.contentStateSubscription) this.contentStateSubscription.unsubscribe();
    if (this.getGenresSubscription) this.getGenresSubscription.unsubscribe();
    if (this.getTrailerSubscription) this.getTrailerSubscription.unsubscribe();
  }
}