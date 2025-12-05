import { Component, signal } from '@angular/core';

import { ClansService } from './clans.service';
import { Router, RouterModule } from '@angular/router';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-clans',
  standalone: true,
  imports: [RouterModule, Field],
  templateUrl: './clans.html',
  styleUrls: ['./clans.css']
})
export class ClansComponent {
  list = signal<any[]>([]);
  private newClanModel = signal({ name: '', description: '', capacity: 10 });
  clanForm = form(this.newClanModel);

  constructor(private clansService: ClansService, private router: Router) {
    this.loadClans();
  }

  loadClans() {
    this.clansService.getClans().subscribe(list => this.list.set(list || []));
  }

  addClan() {
    const name = this.newClanModel().name?.trim();
    if (!name) return;
    this.clansService.createCustomClan(name, this.newClanModel().description, Number(this.newClanModel().capacity))
      .subscribe(() => {
        this.loadClans();
        this.newClanModel.set({ name: '', description: '', capacity: 10 });
      });
  }

  deleteClan(id: number, event: Event) {
    event.stopPropagation();
    this.clansService.deleteClan(id).subscribe(() => this.loadClans());
  }

  goToClan(id: number) {
    this.router.navigate(['/clans', id]);
  }

  trackById(index: number, clan: any) {
    return clan.id;
  }
}
