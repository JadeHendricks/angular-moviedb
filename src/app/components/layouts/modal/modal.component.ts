import { Component, OnInit, Input } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  @Input() showState: string;

  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
  }

  modalStateSwap(event: any): void {
    const stateValue = event.srcElement.innerText.toLowerCase();
    this.baseService.modalStateSwap({ hidden: false, state: stateValue });
  }

  hideModal(event: any): boolean {
    if (event.target.classList.contains("overlay")) {
      this.baseService.modalStateSwap({ hidden: true, state: "" });
    }

    return false;
  }

}
