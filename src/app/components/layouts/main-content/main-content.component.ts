import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentService } from '../../../services/content/content.service';
import { BaseService } from '../../../services/base/base.service';
import { Content } from 'src/app/models/Content';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit, OnDestroy {
  
  private siteState: string = "";
  public convertedTitle: string = "";
  public intialContent: Content[];
  public mostPopularContent: Content;
  private mostPopularContents: Content[];

  private intialCardTitleStateSubscription: Subscription;
  private intialCardStateSubscription: Subscription;
  private contentStateSubscription: Subscription;
  
  constructor(
    private contentService: ContentService,
    private baseService: BaseService
  ) { } 

  ngOnInit(): void {
    this.registerSubscriptions();
  }

  private registerSubscriptions(): void {
    this.getInitialCardTitleState();
    this.getInitalCardState();
    this.getContentState();
  }

  private getInitialCardTitleState(): void {
    this.intialCardTitleStateSubscription = this.baseService.intialCardTitleState.subscribe((value: string) => {
      if (value) {
       this.convertedTitle = value.replace(/_/g, " "); 
      }
    });
  }

  private getInitalCardState(): void {
    this.intialCardStateSubscription = this.baseService.intialCardState.subscribe((value: any) => {
      if (value) {
        this.intialContent = value
      }
    });
  }

  private getContentState(): void {
    this.contentStateSubscription = this.baseService.contentState.subscribe((value: string) => {
      if (value) {
        this.siteState = value;
        this.siteState ? this.getData() : false;
      }
    });
  }
  
  private getData() : void {
    forkJoin(
      [this.contentService.getInitialCardState(), this.contentService.getMostPopularContent()])
      .subscribe(([initialCardState, mostPopularContent]) => {
        if (initialCardState && mostPopularContent) {
          this.intialContent = initialCardState.results;
          this.mostPopularContents = mostPopularContent.results;
          this.setMostPopularMovie(this.mostPopularContents);
        }
    });
  }

  private setMostPopularMovie(content: Content[]): void {
    if (content && content.length) {
      const sortedArray = content.sort((movieA: Content, movieB: Content) => movieB.popularity - movieA.popularity);
      this.mostPopularContent = sortedArray[0];
    }
  }

  ngOnDestroy(): void {
    if (this.intialCardTitleStateSubscription) this.intialCardTitleStateSubscription.unsubscribe();
    if (this.intialCardStateSubscription) this.intialCardStateSubscription.unsubscribe();
    if (this.contentStateSubscription) this.contentStateSubscription.unsubscribe();
  }
}
