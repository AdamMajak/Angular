import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestItemComponent, Quest } from './quest-item';
import { QuestsService } from './quests.service';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [QuestItemComponent],
  templateUrl: './quests.html',
})
export class Quests implements OnInit, OnDestroy {
  quests: Quest[] = [];

  constructor(private questsService: QuestsService) {
    this.quests = this.questsService.getQuests();
  }

  ngOnInit() {
    console.log('Quests component initialized.');
  }

  ngOnDestroy() {
    console.log('Quests component destroyed.');
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
    this.questsService.addQuest(newQuest);
    this.quests = this.questsService.getQuests();
  }

  deleteQuest(id: number) {
    this.questsService.deleteQuest(id);
    this.quests = this.questsService.getQuests();
  }
}
