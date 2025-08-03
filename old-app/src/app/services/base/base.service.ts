import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Contents } from 'src/app/models/Contents';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService implements OnDestroy {
  private isContent: string;

  private contentBehaviorSubscription: Subscription;

  private contentBehavior = new BehaviorSubject<string>("movies");
  private intialCardBehavior = new BehaviorSubject<Contents>(null);
  private intialCardTitleBehavior = new BehaviorSubject<string>("now_playing");
  private modalBehavior = new BehaviorSubject<object>({hidden: true, state: ''});

  public contentState = this.contentBehavior.asObservable();
  public modalState = this.modalBehavior.asObservable();
  public intialCardTitleState = this.intialCardTitleBehavior.asObservable();
  public intialCardState = this.intialCardBehavior.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    this.contentBehaviorSubscription = this.contentBehavior.subscribe(value => this.isContent = value);
  }

  public changeSiteState (value: string) {
    this.contentBehavior.next(value);
  }

  public showModal (value: object): void {
    this.modalBehavior.next(value);
  }

  public modalStateSwap (value: object): void {
    this.modalBehavior.next(value);
  }

  public updateTitleAndCards(value: string): void {
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

  public resetState(): void {
    this.intialCardTitleBehavior.next("now_playing");
  }

  ngOnDestroy(): void {
    if (this.contentBehaviorSubscription) this.contentBehaviorSubscription.unsubscribe();
  }
}
