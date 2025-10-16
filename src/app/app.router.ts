import { Routes } from '@angular/router';
import { Quests } from './quests/quests';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quests', component: Quests },
];
