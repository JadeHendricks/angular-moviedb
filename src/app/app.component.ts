import { Component, OnInit } from '@angular/core';
import { BaseService } from './services/base/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public showModal: boolean;
  public modalState: string;
  
  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.baseService.modalState.subscribe((value: any) => {
      if (value && Object.keys(value).length) {
        this.showModal = value.hidden;
        this.modalState = value.state;
      } 
    });
  }
}
