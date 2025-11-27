import { Injectable, signal } from '@angular/core';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  players = signal<Player[]>([
    { id: 1, nickname: 'ShadowHunter', xp: 12, clanId: 1, quests: [1, 2], avatar: 'assets/avatar1.png' },
    { id: 2, nickname: 'FireMage', xp: 7, clanId: 2, quests: [3], avatar: 'assets/avatar2.png' }
  ]);

  getPlayers() {
    return this.players();
  }

  getPlayer(id: number) {
    return this.players().find(p => p.id === id);
  }

  addPlayer(nickname: string = 'NewPlayer', xp: number = 1) {
    const newId = this.players().length > 0 ? Math.max(...this.players().map(p => p.id)) + 1 : 1;
    const newPlayer: Player = { id: newId, nickname, xp, quests: [], clanId: undefined };
    this.players.update(players => [...players, newPlayer]);
  }

  deletePlayer(id: number) {
    this.players.update(players => players.filter(p => p.id !== id));
  }

  updatePlayer(updatedPlayer: Player) {
    this.players.update(players =>
      players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p)
    );
  }

  createCustomPlayer(nickname: string, xp: number) {
    this.addPlayer(nickname, xp);
  }
}
