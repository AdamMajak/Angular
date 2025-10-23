import { Injectable, signal } from '@angular/core';
import { Quest } from './quest-item';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private readonly _quests = signal<Quest[]>([
    { id: 1, title: 'Hunt the Shadow Beast', description: 'Track down and defeat the creature haunting the dark forest.', completed: false, xp: 150 },
    { id: 2, title: 'Gather Crystal Shards', description: 'Protect the watchtower from waves of bandits during the night raid.', completed: true, xp: 80 },
    { id: 3, title: 'Collect Herbs', description: 'Collect 15 glowing crystal shards from the mountain caves.', completed: false, xp: 45 }
  ]);

  getQuests() {
    return this._quests();
  }

  addQuest(newQuest: Quest) {
    this._quests.update(qs => [...qs, newQuest]);
  }

  deleteQuest(id: number) {
    this._quests.update(qs => qs.filter(q => q.id !== id));
  }

  getQuestById(id: number): Quest | undefined {
    return this._quests().find(q => q.id === id);
  }
}
