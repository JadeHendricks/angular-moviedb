import { Injectable, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  contentBehavior = new BehaviorSubject<string>("movies");
  contentState = this.contentBehavior.asObservable();

  constructor() { }

  changeSiteState (value: string) {
    this.contentBehavior.next(value);
  }
}
