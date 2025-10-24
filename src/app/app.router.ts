import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Quests } from './quests/quests';
import { QuestDetailComponent } from './quests/quest-detail';
import { PlayersListComponent } from './players/players-list';
import { PlayerDetailComponent } from './players/player-detail';
import { ClansListComponent } from './clans/clans-list';
import { ClanDetailComponent } from './clans/clan-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quests', component: Quests },
  { path: 'quests/:id', component: QuestDetailComponent },
  { path: 'players', component: PlayersListComponent },
  { path: 'players/:id', component: PlayerDetailComponent },
  { path: 'clans', component: ClansListComponent },
  { path: 'clans/:id', component: ClanDetailComponent },
];
