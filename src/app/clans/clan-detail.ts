import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ClansService } from './clans.service';
import { PlayersService } from '../players/players.service';
import { playerLevels } from '../players/levels';

@Component({
  selector: 'app-clan-detail',
  standalone: true,
  templateUrl: './clan-detail.html',
  styleUrls: ['./clan-detail.css']
})
export class ClanDetailComponent {
  clan = this.clans.getClan(Number(this.route.snapshot.params['id']));

  constructor(
    private route: ActivatedRoute,
    private clans: ClansService,
    public players: PlayersService,
    private router: Router,
    private location: Location
  ) {}

  members() {
    return this.clan?.members
      ?.map(id => this.players.getPlayer(id))
      .filter((p): p is NonNullable<typeof p> => !!p) ?? [];
  }

  addPlayer(id: number) {
    if (!this.clan) return;
    this.clans.addPlayerToClan(this.clan.id, id);
    this.clan = this.clans.getClan(this.clan.id);
  }

  removePlayer(id: number) {
    if (!this.clan) return;
    this.clans.removePlayerFromClan(this.clan.id, id);
    this.clan = this.clans.getClan(this.clan.id);
  }

  goToPlayer(id: number) {
    this.router.navigate(['/players', id]);
  }

  goBack() {
    this.location.back();
  }

  trackById(_: number, item: { id: number }) {
    return item.id;
  }

  getLevel(player: any) {
    let level = playerLevels[0];
    for (const l of playerLevels) {
      if (player.xp >= l.xpRequired) level = l;
      else break;
    }
    return level;
  }
}
