import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { SeriesService } from 'src/app/services/series/series.service';
import { Content } from 'src/app/models/Content';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {

  query: string;
  searchedContent: Content[];

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService, 
    private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get("query");
    this.movieService.searchMovies(this.query).subscribe(movie => this.searchedContent.push(...movie.results));
    this.seriesService.searchSeries(this.query).subscribe(series => this.searchedContent.push(...series.results));
  }

}