import { Component, signal, computed } from '@angular/core';

import { QuestItemComponent, Quest } from './quest-item';
import { QuestsService } from './quests.service';
import { RouterModule } from '@angular/router';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [QuestItemComponent, RouterModule, Field],
  templateUrl: './quests.html',
  styleUrls: ['./quests.css']
})
export class Quests {
  quests = signal<Quest[]>([]);
  questCount = computed(() => this.quests().length);

  private newQuestModel = signal({ title: '', description: '', xp: 50 });
  questForm = form(this.newQuestModel);

  constructor(private questsService: QuestsService) {
    this.quests.set(this.questsService.getQuests());
  }

  addQuest() {
    const title = this.newQuestModel().title?.trim();
    if (!title) return;

    const quests = this.quests();
    const maxId = quests.length > 0 ? Math.max(...quests.map(q => q.id)) : 0;

    const newQuest: Quest = {
      id: maxId + 1,
      title: title,
      description: this.newQuestModel().description || 'A newly created quest.',
      completed: false,
      xp: Number(this.newQuestModel().xp) || 0
    };

    const ok = this.questsService.addQuest(newQuest);
    if (!ok) return;
    this.quests.set(this.questsService.getQuests());

    this.newQuestModel.set({ title: '', description: '', xp: 50 });
  }

  deleteQuest(id: number) {
    this.questsService.deleteQuest(id);
    this.quests.set(this.questsService.getQuests());
  }

  trackById(index: number, quest: Quest) {
    return quest.id;
  }
}
