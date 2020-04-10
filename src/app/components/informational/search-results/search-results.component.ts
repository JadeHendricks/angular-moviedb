import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { SeriesService } from 'src/app/services/series/series.service';
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
    private movieService: MovieService, 
    private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get("query");

    this.route.params.subscribe((param: Params) => {
      const moviesSearch = this.movieService.searchMovies(param.query);
      const seriesSearch = this.seriesService.searchSeries(param.query);
      
      forkJoin([moviesSearch, seriesSearch]).subscribe((content: Contents[]) => {
        const joinedArray = [...content[0].results, ...content[1].results];
        console.log("joinedArray", joinedArray)
        this.getInMostPopularOrder(joinedArray);
      });

    });
  }

  getInMostPopularOrder(content: Content[]): void {
    this.searchedContent = content.sort((a, b) => b.vote_average - a.vote_average);
  }
}