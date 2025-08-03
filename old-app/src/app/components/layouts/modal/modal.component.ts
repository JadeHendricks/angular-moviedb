import { Component, OnInit, Input } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  @Input() showState: string;

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
  }

  public modalStateSwap(event: any): void {
    if (event && event.srcElement) {
      const stateValue = event.srcElement.innerText.toLowerCase();
      this.baseService.modalStateSwap({ hidden: false, state: stateValue });
    }
  }

  public hideModal(event: any): boolean {
    if (event && event.target.classList) {
      if (event.target.classList.contains("overlay")) {
        this.baseService.modalStateSwap({ hidden: true, state: "" });
      }
    }
    return false;
  }

  public showPassword(event: any): void {
    if (event && event.target && event.target.parentNode && event.target.parentNode.previousSibling) {
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
}
