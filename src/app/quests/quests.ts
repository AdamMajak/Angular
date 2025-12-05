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
    this.loadQuests();
  }

  loadQuests() {
    this.questsService.getQuests().subscribe(list => this.quests.set(list || []));
  }

  addQuest() {
    const title = this.newQuestModel().title?.trim();
    if (!title) return;

    const newQuest: Quest = {
      id: 0,
      title: title,
      description: this.newQuestModel().description || 'A newly created quest.',
      completed: false,
      xp: Number(this.newQuestModel().xp) || 0
    };

    this.questsService.addQuest(newQuest).subscribe(() => {
      this.loadQuests();
      this.newQuestModel.set({ title: '', description: '', xp: 50 });
    });
  }

  deleteQuest(id: number) {
    this.questsService.deleteQuest(id).subscribe(() => this.loadQuests());
  }

  trackById(index: number, quest: Quest) {
    return quest.id;
  }
}
