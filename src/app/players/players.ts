import { Component } from '@angular/core';
import { PlayersService } from './players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  standalone: true,
  templateUrl: 'players.html'
})
export class PlayersComponent {
  constructor(private players: PlayersService, private router: Router) {}

  playersList() {
    return this.players.players();
  }

  addPlayer() {
    this.players.addPlayer();
  }

  delete(id: number) {
    this.players.deletePlayer(id);
  }

  goToPlayer(id: number) {
    this.router.navigate(['/players', id]);
  }
}
