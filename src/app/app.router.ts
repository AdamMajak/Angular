import { Routes } from '@angular/router';
import { Quests } from './quests/quests';
import { HomeComponent } from './home/home.component';
import { QuestDetailComponent } from './quests/quest-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quests', component: Quests },
  { path: 'quests/:id', component: QuestDetailComponent },
];
