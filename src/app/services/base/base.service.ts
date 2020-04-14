import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  contentBehavior = new BehaviorSubject<string>("movies");
  contentState = this.contentBehavior.asObservable();

  modalBehavior = new BehaviorSubject<object>({hidden: true, state: ''});
  modalState = this.modalBehavior.asObservable();

  constructor() { }

  changeSiteState (value: string) {
    this.contentBehavior.next(value);
  }

  showModal (value: object): void {
    this.modalBehavior.next(value);
  }

  modalStateSwap (value: object): void {
    this.modalBehavior.next(value);
  }
}
