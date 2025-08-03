import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseService } from '../../../services/base/base.service';

@Component({
  selector: 'app-side-navigation, [app-side-navigation]',
  templateUrl: './side-navigation.component.html'
})
export class SideNavigationComponent implements OnInit, OnDestroy {

  public title: string;
  public siteContent: string;

  private intialCardTitleStateSubscription: Subscription;
  private getSiteContentSubscription: Subscription;

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.registerSubscriptions();
  }

  private registerSubscriptions(): void {
    this.getInitialCardTitleState();
    this.getSiteContent();
  }

  private getInitialCardTitleState(): void {
    this.intialCardTitleStateSubscription = this.baseService.intialCardTitleState.subscribe((value: string) => {
      if (value) {
        this.title = value
      }
    });
  }

  private getSiteContent(): void {
    this.getSiteContentSubscription = this.baseService.contentState.subscribe((value: string) => {
      if (value) {
        this.siteContent = value
      }
    });
  }
  
  public updateTitleAndCards(title: string): void {
    if (title) {
      if (this.siteContent == "series") {
        title === "now_playing" ? title = "on_the_air" : false;
        this.baseService.updateTitleAndCards(title);
      } else {
        this.baseService.updateTitleAndCards(title);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.intialCardTitleStateSubscription) this.intialCardTitleStateSubscription.unsubscribe();
    if (this.getSiteContentSubscription) this.getSiteContentSubscription.unsubscribe();
  }

}
