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

  player: any | undefined;

  assignedQuests: Quest[] = [];
  completedQuests: Quest[] = [];
  clan: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private players: PlayersService,
    private clans: ClansService,
    private quests: QuestsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    this.players.getPlayer(id).subscribe(p => {
      this.player = p;
      if (this.player?.clanId) {
        this.clans.getClan(this.player.clanId).subscribe(c => this.clan = c);
      }
      this.refreshQuestLists();
    });
  }

  refreshQuestLists() {
    if (!this.player) return;

    this.quests.getQuests().subscribe(all => {
      const map = new Map(all.map((q: any) => [q.id, q]));
      this.assignedQuests = (this.player.assignedQuests || []).map((id: number) => map.get(id)).filter(Boolean) as Quest[];
      this.completedQuests = (this.player.completedQuests || []).map((id: number) => map.get(id)).filter(Boolean) as Quest[];
    });
  }

  markCompleted(q: Quest) {
    if (!this.player) return;

    this.player.assignedQuests = (this.player.assignedQuests || []).filter((id: number) => id !== q.id);
    this.player.completedQuests = [...(this.player.completedQuests || []), q.id];

    this.players.updatePlayer(this.player).subscribe(() => this.refreshQuestLists());
  }

  markUncompleted(q: Quest) {
    if (!this.player) return;

    this.player.completedQuests = (this.player.completedQuests || []).filter((id: number) => id !== q.id);
    this.player.assignedQuests = [...(this.player.assignedQuests || []), q.id];

    this.players.updatePlayer(this.player).subscribe(() => this.refreshQuestLists());
  }

  getClan() {
    return this.clan;
  }

  getTotalXP(): number {
    if (!this.player) return 0;

    return (this.player.completedQuests || [])
      .map((id: number) => this.completedQuests.find(q => q.id === id))
      .filter((q: Quest | undefined): q is Quest => !!q)
      .reduce((sum: number, q: Quest) => sum + (q?.xp ?? 0), 0);
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
