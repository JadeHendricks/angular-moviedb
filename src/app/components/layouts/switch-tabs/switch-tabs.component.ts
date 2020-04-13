import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';

@Component({
  selector: 'app-switch-tabs',
  templateUrl: './switch-tabs.component.html'
})
export class SwitchTabsComponent implements OnInit {

  contentStateValue: string;

  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
    this.baseService.contentState.subscribe(value => this.contentStateValue = value);
  }

  changeSiteState(event: any) {
    const valueRecieved = event.srcElement.innerText.toLowerCase();
    this.baseService.changeSiteState(valueRecieved);
  }

}
