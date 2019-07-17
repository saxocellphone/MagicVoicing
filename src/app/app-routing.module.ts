import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTuneComponent } from './components/new-tune/new-tune.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SheetModeComponent } from './components/sheet-mode/sheet-mode.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomePageComponent, data: {animation: 'Home'}},
  { path: 'addTune', component: NewTuneComponent, data: {animation: 'AddTune'} },
  { path: 'sheetMode/:name', component: SheetModeComponent },
  { path: 'cards', component: CardsComponent, data: {animation: 'Cards'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
