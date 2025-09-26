import { Component } from '@angular/core';
import { QuestItemComponent } from './quests-item';

type Quest = {
  title: string;
  description: string;
  xp: number;
};

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [QuestItemComponent],
  templateUrl: './quests.html',
  styleUrls: ['./quests.css']
})
export class Quests {
  quests: Quest[] = [
    { title: 'Find the Lost Sword', description: 'Retrieve the legendary sword from the ancient ruins.', xp: 120 },
    { title: 'Rescue the Villagers', description: 'Save the villagers captured by goblins.', xp: 80 },
    { title: 'Collect Herbs', description: 'Gather 10 healing herbs for the village healer.', xp: 40 }
  ];

  addQuest() {
    const newId = this.quests.length + 1;
    this.quests.push({
      title: `New Quest ${newId}`,
      description: 'A brand new quest.',
      xp: Math.floor(Math.random() * 150)
    });
  }

  deleteQuest(index: number) {
    this.quests.splice(index, 1);
  }
}
