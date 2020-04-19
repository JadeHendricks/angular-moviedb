import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/Content';
import { Reviews } from 'src/app/models/Reviews';
import { Credits } from 'src/app/models/Credits';
import { Videos } from 'src/app/models/Videos';
import { Contents } from 'src/app/models/Contents';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})

export class ContentService {

  siteState: string = "";

  constructor(
    private http: HttpClient, 
    private baseService: BaseService) { 
      this.baseService.contentState.subscribe(value => this.siteState = value);
    }

  api_key: string = "e87f29ad6137f88242f3bcd9b94b1af7";

  getInitialCardState(): Observable<Contents> {
    return this.siteState === "movies" ? 
    this.http.get<Contents>(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.api_key}&language=en-US&page=1`) : 
    this.http.get<Contents>(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getTrailer (id: number): Observable<Videos> {
    return this.siteState === "movies" ? 
    this.http.get<Videos>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.api_key}&language=en-US&page=1`) : 
    this.http.get<Videos>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getMostPopularContent(): Observable<Contents> {
    return this.siteState === "movies" ? 
    this.http.get<Contents>(`https://api.themoviedb.org/3/movie/popular?api_key=${this.api_key}&language=en-US&page=1`) : 
    this.http.get<Contents>(`https://api.themoviedb.org/3/tv/popular?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getContent(id: string): Observable<Content> {
    return this.siteState === "movies" ? 
    this.http.get<Content>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.api_key}&language=en-US&page=1`) :
    this.http.get<Content>(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getReviews(id: string): Observable<Reviews> {
    return this.siteState === "movies" ? 
    this.http.get<Reviews>(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.api_key}&language=en-US&page=1`) : 
    this.http.get<Reviews>(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getCast(id: string): Observable<Credits> {
    return this.siteState === "movies" ? 
    this.http.get<Credits>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.api_key}&language=en-US&page=1`) : 
    this.http.get<Credits>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getVideos(id: string): Observable<Videos> {
    return this.siteState === "movies" ? 
    this.http.get<Videos>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.api_key}&language=en-US&page=1`) : 
    this.http.get<Videos>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getSimilarContent(id: string): Observable<Contents> {
    return this.siteState === "movies" ? 
    this.http.get<Contents>(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${this.api_key}&language=en-US&page=1`) : 
    this.http.get<Contents>(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getGenres(): Observable<Contents> {
    return this.http.get<Contents>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.api_key}&language=en-US`);
  }

  searchMovies(query: string): Observable<Contents> {
    return this.http.get<Contents>(`https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&query=${query}&language=en-US&page=1&include_adult=false`);
  }

  searchSeries(query: string): Observable<Contents> {
    return this.http.get<Contents>(`https://api.themoviedb.org/3/search/tv?api_key=${this.api_key}&query=${query}&language=en-US&page=1&include_adult=false`);
  }
}
