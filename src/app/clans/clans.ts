import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClansService } from './clans.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-clans',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './clans.html',
  styleUrls: ['./clans.css']
})
export class ClansComponent {
  list = signal(this.clansService.clans());
  newName = '';
  newDescription = '';
  newCapacity = 10;

  constructor(private clansService: ClansService, private router: Router) {}

  addClan() {
    if (!this.newName.trim()) return;
    this.clansService.createCustomClan(this.newName, this.newDescription, this.newCapacity);
    this.list.set(this.clansService.clans());
    this.newName = '';
    this.newDescription = '';
    this.newCapacity = 10;
  }

  deleteClan(id: number, event: Event) {
    event.stopPropagation();
    this.clansService.deleteClan(id);
    this.list.set(this.clansService.clans());
  }

  goToClan(id: number) {
    this.router.navigate(['/clans', id]);
  }

  trackById(index: number, clan: any) {
    return clan.id;
  }
}
