import { Component, signal } from '@angular/core';

interface Member {
  id: number;
  name: string;
  level: number;
  clanId?: number;
}

@Component({
  selector: 'app-clan-detail',
  standalone: true,
  templateUrl: './clan-detail.html',
})
export class ClanDetailComponent {
  
  members = signal<Member[]>([
    { id: 1, name: 'ShadowHunter', level: 12 },
    { id: 2, name: 'DragonSlayer', level: 15 }
  ]);

  
  players = signal<Member[]>([
    { id: 3, name: 'PlayerOne', level: 5 },
    { id: 4, name: 'PlayerTwo', level: 7 }
  ]);

  nextId = 5;

  addMember(name: string) {
    if (name) {
      this.members.update(list => [...list, { id: this.nextId++, name, level: 1 }]);
    }
  }

  removeMember(member: Member) {
    this.members.update(list => list.filter(m => m !== member));
  }
}
