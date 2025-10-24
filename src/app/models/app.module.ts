import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Quests } from './quests/quest';
import { QuestDetailComponent } from './quests/quest-detail';
import { PlayerDetailComponent } from './players/player-detail';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Quests,
    QuestDetailComponent,
    PlayerDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
