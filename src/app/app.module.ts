import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { TopNavigationComponent } from './components/layouts/top-navigation/top-navigation.component';
import { SideNavigationComponent } from './components/layouts/side-navigation/side-navigation.component';
import { MainContentComponent } from './components/layouts/main-content/main-content.component';
import { ModalComponent } from './components/layouts/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    MainContentComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
