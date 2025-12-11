import { Injectable, signal } from '@angular/core';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  players = signal<Player[]>([
    {
      id: 1,
      nickname: 'ShadowHunter',
      xp: 12,
      clanId: 1,
      quests: [1, 2],
      avatar: 'assets/avatar1.png',
      assignedQuests: [1, 2],      // pridajp      assignedQuests: [3],
      completedQuests: []
    }
    ,
    {
      id: 2,
      nickname: 'FlameMage',
      xp: 5,
      clanId: undefined,
      quests: [],
      avatar: 'assets/avatar2.png',
      assignedQuests: [],
      completedQuests: []
    }
  ]);

  getPlayers() {
    return this.players();
  }

  getPlayer(id: number) {
    return this.players().find(p => p.id === id);
  }

  addPlayer() {
    const newId = Math.max(...this.players().map(p => p.id)) + 1;
    const newPlayer: Player = {
      id: newId,
      nickname: 'NewPlayer',
      xp: 1,
      quests: [],
      clanId: undefined,
      assignedQuests: [],
      completedQuests: []
    };
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
    const name = (nickname || '').trim();
    if (name.length < 8) return false;

    const newId = Math.max(...this.players().map(p => p.id)) + 1;
    const newPlayer: Player = {
      id: newId,
      nickname: name,
      xp,
      clanId: undefined,
      quests: [],
      assignedQuests: [],
      completedQuests: []
    };
    this.players.update(players => [...players, newPlayer]);
    return true;
  }
}
