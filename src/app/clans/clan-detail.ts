import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClansService } from '../services/clans.service';
import { Clan } from '../models/clans.model';

@Component({
  selector: 'app-clan-detail',
  templateUrl: './clan-detail.html',
  styleUrls: ['./clan-detail.css']
})
export class ClanDetailComponent {
  clan?: Clan;

  constructor(private route: ActivatedRoute, private clansService: ClansService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clan = this.clansService.getClanById(id);
  }
}
