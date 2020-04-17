import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Contents } from 'src/app/models/Contents';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  api_value: string;
  isContent: string;

  contentBehavior = new BehaviorSubject<string>("movies");
  contentState = this.contentBehavior.asObservable();

  modalBehavior = new BehaviorSubject<object>({hidden: true, state: ''});
  modalState = this.modalBehavior.asObservable();

  intialCardTitleBehavior = new BehaviorSubject<string>("now_playing");
  intialCardTitleState = this.intialCardTitleBehavior.asObservable();

  intialCardBehavior = new BehaviorSubject<Contents>(null);
  intialCardState = this.intialCardBehavior.asObservable();

  constructor(private http: HttpClient) { 
    this.contentBehavior.subscribe(value => this.isContent = value);
  }

  changeSiteState (value: string) {
    this.contentBehavior.next(value);
  }

  showModal (value: object): void {
    this.modalBehavior.next(value);
  }

  modalStateSwap (value: object): void {
    this.modalBehavior.next(value);
  }

  updateTitleAndCards(value: string): void {
    this.intialCardTitleBehavior.next(value);
    if (this.isContent === "movies") {
      this.http.get<any>(`https://api.themoviedb.org/3/movie/${value}?api_key=e87f29ad6137f88242f3bcd9b94b1af7&language=en-US&page=1`).subscribe(value => {
        this.intialCardBehavior.next(value.results);
      });
    } else {
      this.http.get<any>(`https://api.themoviedb.org/3/tv/${value}?api_key=e87f29ad6137f88242f3bcd9b94b1af7&language=en-US&page=1`).subscribe(value => {
        this.intialCardBehavior.next(value.results);
      });
    }
  }

  resetState(): void {
    this.intialCardTitleBehavior.next("Now Playing");
    this.updateTitleAndCards("Now Playing");
  }
}
