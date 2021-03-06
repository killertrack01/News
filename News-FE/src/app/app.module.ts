import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderTopComponent } from './Component/header-top/header-top.component';
import { MainHeaderComponent } from './Component/main-header/main-header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { NewsDetailComponent } from './Pages/news-detail/news-detail.component';
import { NewsComponent } from './Pages/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTopComponent,
    MainHeaderComponent,
    FooterComponent,
    NewsDetailComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
