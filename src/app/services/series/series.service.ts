import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  getInitialCardState(): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US&page=1`);
  }

  getMostPupularSeries(): Observable<{}> {
    return this.http.get<{}>(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US&page=1`);
  }

  getSeries(id: string): Observable<{}> {
    return this.http.get<{}>(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US&page=1`);
  }

  getReviews(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US&page=1`);
  }

  getCast(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US&page=1`);
  }

  getVideos(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US&page=1`);
  }

  getSimilarSeries(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.ANGULAR_APP_API_KEY}&language=en-US&page=1`);
  }
}
