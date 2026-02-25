import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonRouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <ion-router-outlet></ion-router-outlet>
  `,
})
export class AppComponent {}
