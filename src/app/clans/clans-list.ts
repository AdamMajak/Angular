import { Component } from '@angular/core';
import { ClansService } from '../services/clans.service';
import { Clan } from '../models/clans.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clans-list',
  templateUrl: './clans-list.html',
  styleUrls: ['./clans-list.css']
})
export class ClansListComponent {
  clans = this.clansService.clans;

  constructor(private clansService: ClansService, private router: Router) {}

  addClan() {
    const newClan: Clan = { id: Date.now(), name: 'NewClan', description: '', capacity: 10, members: [] };
    this.clansService.addClan(newClan);
    this.router.navigate(['/clans', newClan.id]);
  }

  removeClan(id: number) {
    this.clansService.removeClan(id);
  }
}
