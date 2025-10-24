import { Component } from '@angular/core';
import { NgIf } from '@angular/common';    
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../services/players.service';
import { Player } from '../models/players.model';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [NgIf, RouterModule],         
  templateUrl: './player-detail.html',
  styleUrls: ['./player-detail.css']
})
export class PlayerDetailComponent {
  player?: Player;

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.playersService.getPlayerById(id);
  }
}
