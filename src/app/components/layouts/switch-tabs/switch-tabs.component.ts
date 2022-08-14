import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';

@Component({
  selector: 'app-switch-tabs',
  templateUrl: './switch-tabs.component.html'
})
export class SwitchTabsComponent implements OnInit {

  contentStateValue: string;

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.getContentState();
  }

  private getContentState(): void {
    this.baseService.contentState.subscribe((value: string) => {
      if (value) {
        this.contentStateValue = value
      }
    });
  }

  public changeSiteState(event: any) {
    if (event && event.srcElement) {
      const valueRecieved = event.srcElement.innerText.toLowerCase();
      this.baseService.changeSiteState(valueRecieved);
      this.baseService.resetState();
    }
  }
}
