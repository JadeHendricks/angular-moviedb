import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  api_key: string = "e87f29ad6137f88242f3bcd9b94b1af7";

  getInitialCardState(): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getMostPupularMovie(): Observable<{}> {
    return this.http.get<{}>(`https://api.themoviedb.org/3/movie/popular?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getMovie(id: string): Observable<{}> {
    return this.http.get<{}>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getReviews(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getCast(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getVideos(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getSimilarMovies(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getActor(id: string): Observable<{}> {
    return this.http.get<{}>(`https://api.themoviedb.org/3/person/${id}?api_key=${this.api_key}&language=en-US`)
  }

  getCredits(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${this.api_key}&language=en-US`);
  }
}
