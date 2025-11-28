import { Component, signal, computed } from '@angular/core';

import { QuestItemComponent, Quest } from './quest-item';
import { QuestsService } from './quests.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [QuestItemComponent, RouterModule, FormsModule],
  templateUrl: './quests.html',
  styleUrls: ['./quests.css']
})
export class Quests {
  quests = signal<Quest[]>([]);
  questCount = computed(() => this.quests().length);

  newTitle = '';
  newDescription = '';
  newXp = 50;

  constructor(private questsService: QuestsService) {
    this.quests.set(this.questsService.getQuests());
  }

  addQuest() {
    if (!this.newTitle.trim()) return;

    const quests = this.quests();
    const maxId = quests.length > 0 ? Math.max(...quests.map(q => q.id)) : 0;

    const newQuest: Quest = {
      id: maxId + 1,
      title: this.newTitle,
      description: this.newDescription || 'A newly created quest.',
      completed: false,
      xp: this.newXp
    };

    this.questsService.addQuest(newQuest);
    this.quests.set(this.questsService.getQuests());

    this.newTitle = '';
    this.newDescription = '';
    this.newXp = 50;
  }

  deleteQuest(id: number) {
    this.questsService.deleteQuest(id);
    this.quests.set(this.questsService.getQuests());
  }

  trackById(index: number, quest: Quest) {
    return quest.id;
  }
}
