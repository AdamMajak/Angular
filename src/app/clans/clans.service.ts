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
    const allIds = this.clans().map(c => c.id);
    const newId = allIds.length ? Math.max(...allIds) + 1 : 1;

    const newClan: Clan = {
      id: newId,
      name: 'New Clan',
      description: 'A newly created clan.',
      capacity: 20,
      members: [],
      image: 'assets/default-clan.png'
    };

    this.clans.update(clans => [...clans, newClan]);
  }

  deleteClan(id: number) {
    
    this.clans.update(clans => clans.filter(c => c.id !== id));

    
    this.playersService.players.update(players =>
      players.map(p => p.clanId === id ? { ...p, clanId: undefined } : p)
    );
  }

 

  addPlayerToClan(clanId: number, playerId: number) {
    this.clans.update(clans =>
      clans.map(c => {
        if (c.id === clanId) {
          if (c.members.length < c.capacity && !c.members.includes(playerId)) {
            return { ...c, members: [...c.members, playerId] };
          }
        }
        return c;
      })
    );

   
    this.playersService.updatePlayer({
      ...this.playersService.getPlayer(playerId)!,
      clanId
    });
  }

  removePlayerFromClan(clanId: number, playerId: number) {
    this.clans.update(clans =>
      clans.map(c =>
        c.id === clanId
          ? { ...c, members: c.members.filter(id => id !== playerId) }
          : c
      )
    );

   
    this.playersService.updatePlayer({
      ...this.playersService.getPlayer(playerId)!,
      clanId: undefined
    });
  }
}
