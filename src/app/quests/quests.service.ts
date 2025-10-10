import { Injectable } from '@angular/core';
import { Quest } from './quest-item';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private quests: Quest[] = [
    { id: 1, title: 'Find the Lost Sword', description: 'Retrieve the legendary sword from the ancient ruins.', completed: false, xp: 120 },
    { id: 2, title: 'Rescue the Villagers', description: 'Save the villagers captured by goblins.', completed: true, xp: 60 },
    { id: 3, title: 'Collect Herbs', description: 'Gather 10 healing herbs for the village healer.', completed: false, xp: 30 },
  ];

  constructor() {
    console.log('Service instance created.');
  }

  getQuests(): Quest[] {
    return [...this.quests];
  }

  addQuest() {
    const maxId = Math.max(...this.quests.map(q => q.id), 0);
    const newQuest: Quest = {
      id: maxId + 1,
      title: 'New Quest',
      description: '',
      completed: false,
      xp: 50
    };
    this.quests.push(newQuest);
  }

  deleteQuest(id: number) {
    this.quests = this.quests.filter(q => q.id !== id);
  }
}
