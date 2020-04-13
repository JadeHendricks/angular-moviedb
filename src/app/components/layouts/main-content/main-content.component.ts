import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content/content.service';
import { Content } from 'src/app/models/Content';
import { Contents } from 'src/app/models/Contents';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {

  intialMovies: Content[];
  mostPopularMovies: Content[];
  mostPopularMovie: Content;
  
  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentService.getInitialCardState().subscribe((movie: Contents) => this.intialMovies = movie.results);
    this.contentService.getMostPopularMovies().subscribe((movie: Contents) => {
      this.mostPopularMovies = movie.results;
      this.setMostPopularMovie(this.mostPopularMovies);
    });
  }

  setMostPopularMovie(movie: Content[]): void {
    const sortedArray = this.mostPopularMovies.sort((a: Content, b: Content) => b.popularity - a.popularity);
    this.mostPopularMovie = sortedArray[0];
  }

}
