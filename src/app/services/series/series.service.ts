import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from 'src/app/models/Series';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  api_key: string = "e87f29ad6137f88242f3bcd9b94b1af7";

  getInitialCardState(): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getMostPupularSeries(): Observable<{}> {
    return this.http.get<{}>(`https://api.themoviedb.org/3/tv/popular?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getSeries(id: string): Observable<{}> {
    return this.http.get<{}>(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getReviews(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getCast(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getVideos(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getSimilarSeries(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${this.api_key}&language=en-US&page=1`);
  }

  searchSeries(query: string): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/search/tv?api_key=${this.api_key}&query=${query}&language=en-US&page=1&include_adult=false`);
  }
}
