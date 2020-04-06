import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { TopNavigationComponent } from './components/layouts/top-navigation/top-navigation.component';
import { SideNavigationComponent } from './components/layouts/side-navigation/side-navigation.component';
import { MainContentComponent } from './components/layouts/main-content/main-content.component';
import { ModalComponent } from './components/layouts/modal/modal.component';
import { MovieCardComponent } from './components/cards/movie-card/movie-card.component';
import { SearchResultsCardComponent } from './components/cards/search-results-card/search-results-card.component';
import { CastCardComponent } from './components/cards/cast-card/cast-card.component';
import { MovieSummaryComponent } from './components/informational/movie-summary/movie-summary.component';
import { ActorSummaryComponent } from './components/informational/actor-summary/actor-summary.component';
import { SearchResultsComponent } from './components/informational/search-results/search-results.component';
import { RatingComponent } from './components/rating/rating.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { SwitchTabsComponent } from './components/layouts/switch-tabs/switch-tabs.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MovieService } from './services/movie/movie.service';
import { SeriesService } from './services/series/series.service';
import { CastService } from './services/cast/cast.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    MainContentComponent,
    ModalComponent,
    MovieCardComponent,
    SearchResultsCardComponent,
    CastCardComponent,
    MovieSummaryComponent,
    ActorSummaryComponent,
    SearchResultsComponent,
    RatingComponent,
    ReviewsComponent,
    SwitchTabsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MovieService, SeriesService, CastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
