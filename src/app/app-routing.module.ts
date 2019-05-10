import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTuneComponent } from './components/new-tune/new-tune.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomePageComponent },
  { path: 'addTune', component: NewTuneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
