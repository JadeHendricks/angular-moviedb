import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ContentService } from '../../../services/content/content.service';
import { Content } from 'src/app/models/Content';
import { Contents } from 'src/app/models/Contents';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {

  intialContent: Content[];
  mostPopularContents: Content[];
  mostPopularContent: Content;
  
  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentService.getInitialCardState().subscribe((content: Contents) => this.intialContent = content.results);
    this.contentService.getMostPopularContent().subscribe((content: Contents) => {
      this.mostPopularContents = content.results;
      this.setMostPopularMovie(this.mostPopularContents);
    });
  }

  setMostPopularMovie(movie: Content[]): void {
    const sortedArray = this.mostPopularContents.sort((a: Content, b: Content) => b.popularity - a.popularity);
    this.mostPopularContent = sortedArray[0];
  }

}
