import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contents } from 'src/app/models/Contents';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Reviews } from 'src/app/models/Reviews';
import { Credits } from 'src/app/models/Credits';
import { Videos } from 'src/app/models/Videos';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  api_key: string = "e87f29ad6137f88242f3bcd9b94b1af7";

  getInitialCardState(): Observable<Contents> {
    return this.http.get<Contents>(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getMostPupularSeries(): Observable<Contents> {
    return this.http.get<Contents>(`https://api.themoviedb.org/3/tv/popular?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getSeries(id: string): Observable<Content> {
    return this.http.get<Content>(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getReviews(id: string): Observable<Reviews> {
    return this.http.get<Reviews>(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getCast(id: string): Observable<Credits> {
    return this.http.get<Credits>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getVideos(id: string): Observable<Videos> {
    return this.http.get<Videos>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getSimilarSeries(id: string): Observable<Contents> {
    return this.http.get<Contents>(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${this.api_key}&language=en-US&page=1`);
  }

  searchSeries(query: string): Observable<Contents> {
    return this.http.get<Contents>(`https://api.themoviedb.org/3/search/tv?api_key=${this.api_key}&query=${query}&language=en-US&page=1&include_adult=false`);
  }
}
