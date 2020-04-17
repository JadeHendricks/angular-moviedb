import { Component, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { ContentService } from '../../../services/content/content.service';
import { BaseService } from '../../../services/base/base.service';
import { Content } from 'src/app/models/Content';
import { Contents } from 'src/app/models/Contents';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {
  
  siteState: string = "";
  convertedTitle:  string;
  intialContent: Content[];
  mostPopularContents: Content[];
  mostPopularContent: Content;

  initialCardChange: Contents;
  
  constructor(
    private contentService: ContentService,
    private baseService: BaseService) { }

  ngOnInit(): void {
    this.baseService.intialCardTitleState.subscribe((value: string) => this.convertedTitle = value.replace(/_/g, " "));
    this.baseService.intialCardState.subscribe((value: any) => this.intialContent = value);

    this.baseService.contentState.subscribe((value: string) => {
      this.siteState = value;
      this.siteState ? this.getData() : false;
    });
  }
  getData() : void {
    this.contentService.getInitialCardState().subscribe((content: Contents) => this.intialContent = content.results);
    this.contentService.getMostPopularContent().subscribe((content: Contents) => {
      this.mostPopularContents = content.results;
      this.setMostPopularMovie(this.mostPopularContents);
    });
  }

  setMostPopularMovie(content: Content[]): void {
    const sortedArray = content.sort((a: Content, b: Content) => b.popularity - a.popularity);
    this.mostPopularContent = sortedArray[0];
  }

}
