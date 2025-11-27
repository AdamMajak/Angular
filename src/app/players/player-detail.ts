import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersService } from './players.service';
import { ClansService } from '../clans/clans.service';
import { QuestsService } from '../quests/quests.service';
import { playerLevels, PlayerLevel } from './levels';
import { Quest } from '../quests/quest-item';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  templateUrl: './player-detail.html',
  styleUrls: ['./player-detail.css']
})
export class PlayerDetailComponent {
  player = this.players.getPlayer(Number(this.route.snapshot.params['id']));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private players: PlayersService,
    private clans: ClansService,
    private quests: QuestsService
  ) {}

  getPlayerQuests(): Quest[] {
    return this.player?.quests
      .map(id => this.quests.getQuest(id))
      .filter((q): q is Quest => !!q) ?? [];
  }

  getClan() {
    return this.player?.clanId ? this.clans.getClan(this.player.clanId) : null;
  }

  getTotalXP(): number {
    return this.player?.quests
      .map(id => this.quests.getQuest(id))
      .filter(q => !!q)
      .reduce((sum, q) => sum + (q?.xp ?? 0), 0) ?? 0;
  }

  getLevelInfo(): { current: PlayerLevel; next: PlayerLevel } {
    const xp = this.getTotalXP();
    let current = playerLevels[0];
    let next = playerLevels[1];
    for (let i = 0; i < playerLevels.length; i++) {
      if (xp >= playerLevels[i].xpRequired) current = playerLevels[i];
      if (xp < playerLevels[i].xpRequired) {
        next = playerLevels[i];
        break;
      }
    }
    return { current, next };
  }

  getXPToNextLevel(): number {
    const info = this.getLevelInfo();
    return Math.max(0, info.next.xpRequired - this.getTotalXP());
  }

  goToQuest(id: number) {
    this.router.navigate(['/quests', id]);
  }

  goToClan(id: number) {
    this.router.navigate(['/clans', id]);
  }

  goBack() {
    this.location.back();
  }
}
