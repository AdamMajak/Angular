import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestsService } from './quests.service';
import { Quest } from './quest-item';

@Component({
  selector: 'app-quest-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quest-detail.html',
})
export class QuestDetailComponent {
  quest?: Quest;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questsService: QuestsService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quest = this.questsService.getQuest(id); // <-- použitie novej metódy getQuest
  }

  goBack(): void {
    this.router.navigate(['/quests']);
  }
}
