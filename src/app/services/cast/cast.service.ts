import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(private http: HttpClient) { }

  api_key: string = "e87f29ad6137f88242f3bcd9b94b1af7";

  getActor(id: string): Observable<any>  {
    return this.http.get<any>(`https://api.themoviedb.org/3/person/${id}?api_key=${this.api_key}&language=en-US`)
  }

  getCredits(id: string): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${this.api_key}&language=en-US`)
  }
}
