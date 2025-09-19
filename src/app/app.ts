import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],   
  template: `
    <app-header></app-header>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'default';
}
