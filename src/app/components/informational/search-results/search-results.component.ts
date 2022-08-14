import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ContentService } from 'src/app/services/content/content.service';
import { Content } from 'src/app/models/Content';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public query: string;
  public searchedContent: Content[] = [];

  private routingSubscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private contentService: ContentService) { }

  ngOnInit(): void {
    this.getRoutingParam();
  }

  private getRoutingParam(): void {
    this.routingSubscription = this.route.params.subscribe((param: Params) => {
      if (param && Object.keys(param).length) {
        this.query = this.route.snapshot.paramMap.get("query");
        this.getSearchMoviesAndSeries(param);
      }
    });
  }

  private getSearchMoviesAndSeries(param: Params): void {
    forkJoin([
      this.contentService.searchMovies(param.query), 
      this.contentService.searchSeries(param.query)])
      .subscribe(([movies, series]) => {
        if (movies && movies.results && series && series.results) {
          const joinedArray = [...movies.results, ...series.results];
          this.getInMostPopularOrder(joinedArray);
        }
    });
  }

  private getInMostPopularOrder(content: Content[]): void {
    if (content && content.length) {
      this.searchedContent = content.sort((contentA: Content, contentB: Content) => contentB.vote_average - contentA.vote_average);
    }
  }

  ngOnDestroy(): void {
    if (this.routingSubscription) this.routingSubscription.unsubscribe();
  }
}