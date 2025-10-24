import { Injectable, signal } from '@angular/core';
import { Clan } from '../models/clans.model';
import { Player } from '../models/players.model';

@Injectable({ providedIn: 'root' })
export class ClansService {
  private _clans = signal<Clan[]>([
    { id: 1, name: 'Warriors', description: 'Strong clan', capacity: 10, members: [] }
  ]);

  clans = this._clans.asReadonly();

  addClan(clan: Clan) {
    this._clans.update(c => [...c, clan]);
  }

  removeClan(clanId: number) {
    this._clans.update(c => c.filter(cl => cl.id !== clanId));
  }

  addMember(clanId: number, player: Player) {
    this._clans.update(clans =>
      clans.map(clan => {
        if (clan.id === clanId && clan.members.length < clan.capacity) {
          return { ...clan, members: [...clan.members, player] };
        }
        return clan;
      })
    );
  }

  removeMember(clanId: number, playerId: number) {
    this._clans.update(clans =>
      clans.map(clan => {
        if (clan.id === clanId) {
          return { ...clan, members: clan.members.filter(m => m.id !== playerId) };
        }
        return clan;
      })
    );
  }

  getClanById(id: number): Clan | undefined {
    return this._clans().find(c => c.id === id);
  }
}
