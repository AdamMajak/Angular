import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlayersService } from './players.service';
import { ClansService } from '../clans/clans.service';
import { QuestsService } from '../quests/quests.service';
import { Quest } from '../quests/quest-item';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'player-detail.html',
})
export class PlayerDetailComponent {
  player = this.players.getPlayer(Number(this.route.snapshot.params['id']));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private players: PlayersService,
    private clans: ClansService,
    private quests: QuestsService
  ) {}

  goBack() {
    this.router.navigate(['/players']);
  }

  getPlayerQuests(): Quest[] {
    return (
      this.player?.quests
        .map(id => this.quests.getQuest(id))
        .filter((q): q is Quest => !!q) ?? []
    );
  }

  getClan() {
    return this.player?.clanId ? this.clans.getClan(this.player.clanId) : null;
  }

  goToQuest(id: number) {
    this.router.navigate(['/quests', id]);
  }

  goToClan(id: number) {
    this.router.navigate(['/clans', id]);
  }
}
