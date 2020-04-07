import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Content } from 'src/app/models/Content';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {

  intialMovies: Content[];
  mostPopularMovies: Content[];
  mostPopularMovie: Content;
  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getInitialCardState().subscribe(movie => this.intialMovies = movie.results);
    this.movieService.getMostPopularMovies().subscribe(movie => {
      this.mostPopularMovies = movie.results;
      this.setMostPopularMovie(this.mostPopularMovies);
    });
  }

  setMostPopularMovie(movie: Content[]): void {
    const sortedArray = this.mostPopularMovies.sort((a: Content, b: Content) => b.popularity - a.popularity);
    this.mostPopularMovie = sortedArray[0];
  }

}
