import { Component } from '@angular/core';
import { BaseService } from './services/base/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  showModal: boolean;
  modalState: string;
  
  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
    this.baseService.modalState.subscribe((value: any) => {
      this.showModal = value.hidden;
      this.modalState = value.state;
    });
  }
}
