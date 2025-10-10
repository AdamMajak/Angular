import { Injectable } from '@angular/core';
import { Quest } from './quest-item';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private quests: Quest[] = [
    { id: 1, title: 'Hunt the Shadow Beast', description: 'Track down and defeat the creature haunting the dark forest.', completed: false, xp: 150 },
    { id: 2, title: 'Gather Crystal Shards', description: 'Protect the watchtower from waves of bandits during the night raid.', completed: true, xp: 80 },
    { id: 3, title: 'Collect Herbs', description: 'Collect 15 glowing crystal shards from the mountain caves.', completed: false, xp: 45 }
  ];

  constructor() {
    console.log('Service instance created.');
  }

  getQuests(): Quest[] {
    return this.quests;
  }

  addQuest(newQuest: Quest) {
    this.quests = [...this.quests, newQuest];
  }

  deleteQuest(id: number) {
    this.quests = this.quests.filter(q => q.id !== id);
  }
}
