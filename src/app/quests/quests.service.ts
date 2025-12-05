import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quest } from './quest-item';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuests(): Observable<Quest[]> {
    return this.http.get<Quest[]>(`${this.baseUrl}/quests`);
  }

  getQuest(id: number): Observable<Quest> {
    return this.http.get<Quest>(`${this.baseUrl}/quests/${id}`);
  }

  addQuest(newQuest: Quest): Observable<Quest> {
    return this.http.post<Quest>(`${this.baseUrl}/quests`, newQuest);
  }

  deleteQuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/quests/${id}`);
  }
}
