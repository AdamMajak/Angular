import { Component, signal, computed } from '@angular/core';
import { QuestItemComponent, Quest } from './quest-item';
import { QuestsService } from './quests.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [QuestItemComponent, RouterModule],
  templateUrl: './quests.html',
  styleUrls: ['./quests.css']
})
export class Quests {
  quests = signal<Quest[]>([]);
  questCount = computed(() => this.quests().length);

  constructor(private questsService: QuestsService) {
    this.quests.set(this.questsService.getQuests());
  }

  addQuest() {
    const currentQuests = this.quests();
    const maxId = Math.max(...currentQuests.map(q => q.id), 0);
    const newQuest: Quest = {
      id: maxId + 1,
      title: 'New Quest',
      description: 'A newly created quest with unknown danger.',
      completed: false,
      xp: 50
    };
    this.questsService.addQuest(newQuest);
    this.quests.set(this.questsService.getQuests());
  }

  deleteQuest(id: number) {
    this.questsService.deleteQuest(id);
    this.quests.set(this.questsService.getQuests());
  }

  trackById(index: number, quest: Quest) {
    return quest.id;
  }
}
