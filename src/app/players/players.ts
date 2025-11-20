import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from './players.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './players.html',
  styleUrls: ['./players.css']
})
export class PlayersComponent {
  playersList = signal(this.playersService.players());
  newNickname = '';
  newLevel = 1;

  constructor(private playersService: PlayersService, private router: Router) {}

  addPlayer() {
    if (!this.newNickname.trim()) return;
    this.playersService.createCustomPlayer(this.newNickname, this.newLevel);
    this.playersList.set(this.playersService.players());
    this.newNickname = '';
    this.newLevel = 1;
  }

  deletePlayer(id: number, event: Event) {
    event.stopPropagation();
    this.playersService.deletePlayer(id);
    this.playersList.set(this.playersService.players());
  }

  goToPlayer(id: number) {
    this.router.navigate(['/players', id]);
  }

  trackById(index: number, player: any) {
    return player.id;
  }
}
