import { Component, signal, computed } from '@angular/core';

import { PlayersService } from './players.service';
import { RouterModule, Router } from '@angular/router';
import { Search } from '../search/search';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterModule, Search, Field],
  templateUrl: './players.html',
  styleUrls: ['./players.css']
})
export class PlayersComponent {
  playersList = signal(this.playersService.players());
  filteredPlayers = signal(this.playersList());
  private newPlayerModel = signal({ nickname: '', xp: 1 });
  playerForm = form(this.newPlayerModel);
  selectedLevel = signal('');

  constructor(private playersService: PlayersService, private router: Router) {}

  addPlayer() {
    const nick = this.newPlayerModel().nickname?.trim();
    if (!nick) return;
    this.playersService.createCustomPlayer(nick, Number(this.newPlayerModel().xp));
    this.updatePlayers();
    this.newPlayerModel.set({ nickname: '', xp: 1 });
  }

  deletePlayer(id: number, event: Event) {
    event.stopPropagation();
    this.playersService.deletePlayer(id);
    this.updatePlayers();
  }

  goToPlayer(id: number) {
    this.router.navigate(['/players', id]);
  }

  trackById(index: number, player: any) {
    return player.id;
  }

  updatePlayers() {
    let list = this.playersService.players();
    if (this.selectedLevel()) {
      list = list.filter(p => this.getPlayerLevel(p).title === this.selectedLevel());
    }
    if (this.searchQuery()) {
      const q = this.searchQuery().toLowerCase();
      list = list.filter(p => p.nickname.toLowerCase().includes(q));
    }
    this.filteredPlayers.set(list);
  }

  searchQuery = signal('');
  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.updatePlayers();
  }

  onLevelChange(level: string) {
    this.selectedLevel.set(level);
    this.updatePlayers();
  }

  getPlayerLevel(player: any) {
    const levels = [
      { level: 1, xpRequired: 0, title: 'Novice' },
      { level: 2, xpRequired: 100, title: 'Apprentice' },
      { level: 3, xpRequired: 300, title: 'Adept' },
      { level: 4, xpRequired: 600, title: 'Expert' },
      { level: 5, xpRequired: 1000, title: 'Master' },
      { level: 6, xpRequired: 2000, title: 'Grandmaster' },
      { level: 7, xpRequired: 3500, title: 'Legend' },
      { level: 8, xpRequired: 5500, title: 'Mythic' },
      { level: 9, xpRequired: 8000, title: 'Immortal' },
      { level: 10, xpRequired: 12000, title: 'Eternal' }
    ];
    return levels.slice().reverse().find(l => player.xp >= l.xpRequired) || levels[0];
  }
}
