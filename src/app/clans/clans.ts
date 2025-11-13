import { Component } from '@angular/core';
import { ClansService } from './clans.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clans',
  templateUrl: 'clans.html',
})
export class ClansComponent {
  constructor(private clans: ClansService, private router: Router) {}

  list = this.clans.clans;

  addClan() {
    this.clans.addClan();
  }

  deleteClan(id: number) {
    this.clans.deleteClan(id);
  }

  goToClan(id: number) {
    this.router.navigate(['/clans', id]);
  }
}
