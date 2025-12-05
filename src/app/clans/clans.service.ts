import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Clan } from './clan.model';
import { PlayersService } from '../players/players.service';

@Injectable({
  providedIn: 'root',
})
export class ClansService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private playersService: PlayersService) {}

  getClans(): Observable<Clan[]> {
    return this.http.get<Clan[]>(`${this.baseUrl}/clans`);
  }

  getClan(id: number): Observable<Clan> {
    return this.http.get<Clan>(`${this.baseUrl}/clans/${id}`);
  }

  createCustomClan(name: string, description: string, capacity: number): Observable<Clan> {
    const newClan: Partial<Clan> = {
      name,
      description,
      capacity,
      members: []
    };
    return this.http.post<Clan>(`${this.baseUrl}/clans`, newClan);
  }

  deleteClan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clans/${id}`);
  }

  addPlayerToClan(clanId: number, playerId: number): Observable<any> {
    // fetch clan, update members, then update player
    return this.getClan(clanId).pipe(
      switchMap(clan => {
        const members = Array.isArray(clan.members) ? [...clan.members, playerId] : [playerId];
        const updated = { ...clan, members } as Clan;
        return this.http.put<Clan>(`${this.baseUrl}/clans/${clanId}`, updated).pipe(
          switchMap(() => this.playersService.getPlayer(playerId).pipe(
            switchMap(player => {
              const p = { ...(player as any), clanId };
              return this.playersService.updatePlayer(p as any);
            })
          ))
        );
      })
    );
  }

  removePlayerFromClan(clanId: number, playerId: number): Observable<any> {
    return this.getClan(clanId).pipe(
      switchMap(clan => {
        const members = Array.isArray(clan.members) ? clan.members.filter((id: number) => id !== playerId) : [];
        const updated = { ...clan, members } as Clan;
        return this.http.put<Clan>(`${this.baseUrl}/clans/${clanId}`, updated).pipe(
          switchMap(() => this.playersService.getPlayer(playerId).pipe(
            switchMap(player => {
              const p = { ...(player as any), clanId: undefined };
              return this.playersService.updatePlayer(p as any);
            })
          ))
        );
      })
    );
  }
}
