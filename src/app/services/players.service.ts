import { Injectable, signal } from '@angular/core';
import { Player } from '../models/players.model';
import { ClansService } from './clans.service';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private _players = signal<Player[]>([
    { id: 1, nickname: 'Hero1', level: 5, quests: [], clan: undefined },
    { id: 2, nickname: 'Hero2', level: 10, quests: [], clan: undefined }
  ]);

  players = this._players.asReadonly();

  constructor(private clansService: ClansService) {}

  addPlayer(player: Player) {
    this._players.update(players => [...players, player]);
  }

  removePlayer(playerId: number) {
    this._players.update(players => players.filter(p => p.id !== playerId));
  }

  getPlayerById(id: number): Player | undefined {
    return this._players().find(p => p.id === id);
  }
}
