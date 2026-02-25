import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/selectTable"></ion-back-button>
        </ion-buttons>
        <ion-title style="text-align:center">{{ headerText() }}</ion-title>
      </ion-toolbar>
    </ion-header>
  `,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  headerText = signal('');

  private sub!: Subscription;

  private routeTitleMap: Record<string, string> = {
    '/menu': 'Place Order',
    '/selectTable': 'Select Table',
    '/login': '',
  };

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const urlTree = this.router.parseUrl(e.urlAfterRedirects ?? e.url);
        const tbname = urlTree.queryParams['TBNAME'];
        if (tbname) {
          this.headerText.set(tbname);
        } else {
          const path = '/' + (urlTree.root.children['primary']?.segments.map((s: any) => s.path).join('/') ?? '');
          this.headerText.set(this.routeTitleMap[path] ?? '');
        }
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
