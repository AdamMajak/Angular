import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PlayersService } from '../services/players.service';
import { Player } from '../models/players.model';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './players-list.html',
  styleUrls: ['./players-list.css']
})
export class PlayersListComponent {
  players = this.playersService.players;

  constructor(private playersService: PlayersService, private router: Router) {}

  
  addPlayer() {
    const newPlayer: Player = {
      id: Date.now(),
      nickname: 'NewPlayer',
      level: 1,
      quests: [],
      clan: undefined
    };
    this.playersService.addPlayer(newPlayer);
    this.router.navigate(['/players', newPlayer.id]);
  }

 
  removePlayer(id: number) {
    this.playersService.removePlayer(id);
  }

  
  trackById(index: number, item: Player) {
    return item.id;
  }
}
