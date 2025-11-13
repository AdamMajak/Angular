import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Quests } from './quests/quests';
import { QuestDetailComponent } from './quests/quest-detail';
import { PlayersComponent } from './players/players';
import { PlayerDetailComponent } from './players/player-detail';
import { ClansComponent } from './clans/clans';
import { ClanDetailComponent } from './clans/clan-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'quests', component: Quests },
  { path: 'quests/:id', component: QuestDetailComponent },

  { path: 'players', component: PlayersComponent },
  { path: 'players/:id', component: PlayerDetailComponent },

  { path: 'clans', component: ClansComponent },
  { path: 'clans/:id', component: ClanDetailComponent },
];
