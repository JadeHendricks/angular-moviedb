import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './components/layouts/main-content/main-content.component';
import { MovieSummaryComponent } from './components/informational/movie-summary/movie-summary.component';
import { ActorSummaryComponent } from './components/informational/actor-summary/actor-summary.component';
import { SearchResultsComponent } from './components/informational/search-results/search-results.component';

const routes: Routes = [
  { path: "", component: MainContentComponent },
  { path: "moviesummary/:id", component: MovieSummaryComponent },
  { path: "actorsummary/:id", component: ActorSummaryComponent },
  { path: "searchresults/:query", component: SearchResultsComponent },
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
