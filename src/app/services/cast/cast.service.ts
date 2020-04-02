import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(private http: HttpClient) { }

  getActor(id: string): Observable<{}>  {
    return this.http.get<{}>(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US`)
  }

  getCredits(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US`)
  }
}
