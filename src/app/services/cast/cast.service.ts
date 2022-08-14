import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/Actor';
import { Credits } from 'src/app/models/Credits';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(
    private http: HttpClient
  ) { }

  api_key: string = "e87f29ad6137f88242f3bcd9b94b1af7";

  public getActor(id: string): Observable<Actor>  {
    return this.http.get<Actor>(`https://api.themoviedb.org/3/person/${id}?api_key=${this.api_key}&language=en-US`)
  }

  public getCredits(id: string): Observable<Credits> {
    return this.http.get<Credits>(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${this.api_key}&language=en-US`)
  }
}
