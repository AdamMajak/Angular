import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClansService } from './clans.service';
import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-clan-detail',
  templateUrl: 'clan-detail.html',
})
export class ClanDetailComponent {
  clan = this.clans.getClan(Number(this.route.snapshot.params['id']));

  constructor(
    private route: ActivatedRoute,
    private clans: ClansService,
    public players: PlayersService, // public namiesto private
    private router: Router
  ) {}

  members() {
    return this.clan?.members
      .map(id => this.players.getPlayer(id))
      .filter(Boolean);
  }

  addPlayer(id: number) {
    if (this.clan) {
      this.clans.addPlayerToClan(this.clan.id, id);
    }
  }

  removePlayer(id: number) {
    if (this.clan) {
      this.clans.removePlayerFromClan(this.clan.id, id);
    }
  }

  goToPlayer(id: number) {
    this.router.navigate(['/players', id]);
  }
}
