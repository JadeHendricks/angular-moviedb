import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ContentService } from 'src/app/services/content/content.service';
import { Content } from 'src/app/models/Content';
import { forkJoin } from 'rxjs';
import { Contents } from 'src/app/models/Contents';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {

  query: string;
  searchedMovies: Content[] = [];
  searchedSeries: Content[] = [];
  searchedContent: Content[] = [];

  constructor(
    private route: ActivatedRoute, 
    private contentService: ContentService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.query = this.route.snapshot.paramMap.get("query");
      const moviesSearch = this.contentService.searchMovies(param.query);
      const seriesSearch = this.contentService.searchSeries(param.query);
      
      forkJoin([moviesSearch, seriesSearch]).subscribe((content: Contents[]) => {
        const joinedArray = [...content[0].results, ...content[1].results];
        this.getInMostPopularOrder(joinedArray);
      });
    });
  }

  getInMostPopularOrder(content: Content[]): void {
    this.searchedContent = content.sort((a: Content, b: Content) => b.vote_average - a.vote_average);
  }
}