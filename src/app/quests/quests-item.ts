import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Quest {
  id: number;
  title: string;
}

@Component({
  selector: 'app-quest-item',
  templateUrl: './quest-item.component.html',
  styleUrls: ['./quest-item.component.css']
})
export class QuestItemComponent {
  @Input({ required: true }) quest!: Quest; 
  @Output() deleteQuest: EventEmitter<number> = new EventEmitter<number>();

  onDelete() {
    this.deleteQuest.emit(this.quest.id);
  }
}
