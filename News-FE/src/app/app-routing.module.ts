import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailComponent } from './Pages/news-detail/news-detail.component';
import { NewsComponent } from './Pages/news/news.component';

const routes: Routes = [
  {path:'',component:NewsComponent,pathMatch:'full'},
  {path:'details',component:NewsDetailComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
