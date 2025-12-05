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
  clan: any | undefined;
  membersList: any[] = [];
  availablePlayers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private clans: ClansService,
    public players: PlayersService,
    private router: Router,
    private location: Location
  ) {
    const id = Number(this.route.snapshot.params['id']);
    this.loadClan(id);
  }

  loadClan(id: number) {
    this.clans.getClan(id).subscribe(c => {
      this.clan = c;
      this.loadMembers();
    });
  }

  loadMembers() {
    if (!this.clan) {
      this.membersList = [];
      return;
    }
    this.players.getPlayers().subscribe(all => {
      const map = new Map(all.map((p: any) => [p.id, p]));
      this.membersList = (this.clan.members || []).map((id: number) => map.get(id)).filter(Boolean);
      this.availablePlayers = all.filter((p: any) => !(this.clan.members || []).includes(p.id));
    });
  }

  addPlayer(id: number) {
    if (!this.clan) return;
    this.clans.addPlayerToClan(this.clan.id, id).subscribe(() => this.loadClan(this.clan.id));
  }

  removePlayer(id: number) {
    if (!this.clan) return;
    this.clans.removePlayerFromClan(this.clan.id, id).subscribe(() => this.loadClan(this.clan.id));
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
