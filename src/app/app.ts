import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { Quests } from './quests/quests';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, Quests],   
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = 'default';
}
