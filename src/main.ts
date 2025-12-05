import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; 
import { provideRouter } from '@angular/router';
import { routes } from './app/app.router';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [provideZoneChangeDetection(), provideRouter(routes), provideHttpClient()]
}).catch(err => console.error(err));
