import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/players`);
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/players/${id}`);
  }

  createCustomPlayer(nickname: string, xp: number): Observable<Player> {
    const newPlayer: Partial<Player> = {
      nickname,
      xp,
      quests: [],
      assignedQuests: [],
      completedQuests: []
    };
    return this.http.post<Player>(`${this.baseUrl}/players`, newPlayer);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/players/${id}`);
  }

  updatePlayer(updatedPlayer: Player): Observable<Player> {
    return this.http.put<Player>(`${this.baseUrl}/players/${updatedPlayer.id}`, updatedPlayer);
  }
}
