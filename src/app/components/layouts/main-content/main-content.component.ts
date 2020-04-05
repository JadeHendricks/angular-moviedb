import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {

  intialMovies: any[];
  mostPopularMovies: any[];
  mostPopularMovie: any;
  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getInitialCardState().subscribe(movie => this.intialMovies = movie.results);
    this.movieService.getMostPupularMovies().subscribe(movie => {
      this.mostPopularMovies = movie.results;
      this.setMostPopularMovie(this.mostPopularMovies);
    });
  }

  setMostPopularMovie(movie: any): void {
    const sortedArray = this.mostPopularMovies.sort((a,b) => b.popularity - a.popularity);
    this.mostPopularMovie = sortedArray[0];
  }

}
