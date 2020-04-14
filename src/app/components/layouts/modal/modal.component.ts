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

  showPassword(event: any): void {
    const passwordInput = event.target.parentNode.previousSibling as HTMLInputElement;
    const visibleIcon = event.target as HTMLInputElement;

    if (passwordInput.getAttribute("type") === "password") {
      passwordInput.setAttribute("type", "text");
      visibleIcon.setAttribute("xlink:href", "assets/sprite.svg#icon-eye-blocked");
    } else {
      passwordInput.setAttribute("type", "password");
      visibleIcon.setAttribute("xlink:href", "assets/sprite.svg#icon-eye");
    }
  }
  
}
