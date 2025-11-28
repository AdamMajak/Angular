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

  assignedQuests: Quest[] = [];
  completedQuests: Quest[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private players: PlayersService,
    private clans: ClansService,
    private quests: QuestsService
  ) {}

  ngOnInit() {
    this.refreshQuestLists();
  }

  refreshQuestLists() {
    if (!this.player) return;

    this.assignedQuests = this.player.assignedQuests
      .map(id => this.quests.getQuest(id))
      .filter((q): q is Quest => !!q);

    this.completedQuests = this.player.completedQuests
      .map(id => this.quests.getQuest(id))
      .filter((q): q is Quest => !!q);
  }

  markCompleted(q: Quest) {
    if (!this.player) return;

    this.player.assignedQuests = this.player.assignedQuests.filter(id => id !== q.id);
    this.player.completedQuests.push(q.id);

    this.refreshQuestLists();
  }

  markUncompleted(q: Quest) {
    if (!this.player) return;

    this.player.completedQuests = this.player.completedQuests.filter(id => id !== q.id);
    this.player.assignedQuests.push(q.id);

    this.refreshQuestLists();
  }

  getClan() {
    return this.player?.clanId ? this.clans.getClan(this.player.clanId) : null;
  }

  getTotalXP(): number {
    if (!this.player) return 0;

    return this.player.completedQuests
      .map(id => this.quests.getQuest(id))
      .filter(q => !!q)
      .reduce((sum, q) => sum + (q?.xp ?? 0), 0);
  }

  getLevelInfo(): { current: PlayerLevel; next: PlayerLevel } {
    const xp = this.getTotalXP();
    let current = playerLevels[0];
    let next = playerLevels[playerLevels.length - 1];

    for (let lvl of playerLevels) {
      if (xp >= lvl.xpRequired) current = lvl;
      if (xp < lvl.xpRequired) {
        next = lvl;
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
