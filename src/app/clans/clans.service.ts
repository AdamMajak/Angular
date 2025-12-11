import { Injectable, signal } from '@angular/core';
import { Clan } from './clan.model';
import { PlayersService } from '../players/players.service';

@Injectable({
  providedIn: 'root',
})
export class ClansService {
  constructor(private playersService: PlayersService) {}

  clans = signal<Clan[]>([
    {
      id: 1,
      name: 'DragonSlayers',
      description: 'Elite warriors slaying dragons.',
      capacity: 10,
      members: [1],
      image: 'assets/clan1.png'
    },
    {
      id: 2,
      name: 'FireGuild',
      description: 'Masters of fire magic.',
      capacity: 15,
      members: [2],
      image: 'assets/clan2.png'
    }
  ]);

  getClans() {
    return this.clans();
  }

  getClan(id: number) {
    return this.clans().find(c => c.id === id);
  }

  addClan() {
    const newId = Math.max(...this.clans().map(c => c.id)) + 1;
    const newClan: Clan = {
      id: newId,
      name: 'New Clan',
      description: 'A newly created clan.',
      capacity: 20,
      members: [],
    };
    this.clans.update(clans => [...clans, newClan]);
  }

  deleteClan(id: number) {
    this.clans.update(clans => clans.filter(c => c.id !== id));
  }

  addPlayerToClan(clanId: number, playerId: number) {
    this.clans.update(clans =>
      clans.map(c => {
        if (c.id === clanId) {
          if (c.members.length < c.capacity) {
            return { ...c, members: [...c.members, playerId] };
          }
        }
        return c;
      })
    );

    const player = this.playersService.getPlayer(playerId);
    if (player) {
      this.playersService.updatePlayer({
        ...player,
        clanId
      });
    }
  }

  removePlayerFromClan(clanId: number, playerId: number) {
    this.clans.update(clans =>
      clans.map(c =>
        c.id === clanId
          ? { ...c, members: c.members.filter(id => id !== playerId) }
          : c
      )
    );

    const player = this.playersService.getPlayer(playerId);
    if (player) {
      this.playersService.updatePlayer({
        ...player,
        clanId: undefined
      });
    }
  }


  createCustomClan(name: string, description: string, capacity: number) {
  const n = (name || '').trim();
  const d = (description || '').trim();
  if (n.length < 8 || d.length < 8) return false;

  const newId = Math.max(...this.clans().map(c => c.id)) + 1;
  const newClan = {
    id: newId,
    name: n,
    description: d,
    capacity,
    members: []
  };
  this.clans.update(clans => [...clans, newClan]);
  return true;
}

}
