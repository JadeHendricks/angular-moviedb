import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';

@Component({
  selector: 'app-side-navigation, [app-side-navigation]',
  templateUrl: './side-navigation.component.html'
})
export class SideNavigationComponent implements OnInit {

  title: string;
  siteContent: string;
  isSeries: boolean;

  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
    this.baseService.intialCardTitleState.subscribe((value: string) => this.title = value);
    this.baseService.contentBehavior.subscribe((value: string) => this.siteContent = value);
  }
  
  updateTitleAndCards(title: string): void {
    if (this.siteContent == "series") {
      title === "now_playing" ? title = "on_the_air" : false;
      this.baseService.updateTitleAndCards(title);
    } else {
      this.baseService.updateTitleAndCards(title);
    }
  }

}
