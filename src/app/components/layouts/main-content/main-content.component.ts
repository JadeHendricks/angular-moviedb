import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { SeriesService } from 'src/app/services/series/series.service';
import { Movie } from 'src/app/models/Movie';
import { Series } from 'src/app/models/Series';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {

  intialMovies: any[];
  initialSeries: any[];
  
  constructor(private movieService: MovieService, private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.movieService.getInitialCardState().subscribe(movie => this.intialMovies = movie.results);
  }

}
