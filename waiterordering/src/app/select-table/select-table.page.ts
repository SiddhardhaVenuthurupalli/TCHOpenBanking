import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonSpinner,
  ToastController
} from '@ionic/angular/standalone';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-select-table',
  standalone: true,
  imports: [
    IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonButton, IonSpinner
  ],
  template: `
    <ion-content class="ion-padding">
      <div class="container">
        <h2 class="text-center my-3">Select Table</h2>
        @if (loading()) {
          <div class="d-flex justify-content-center mt-5">
            <ion-spinner name="crescent"></ion-spinner>
          </div>
        } @else {
          <ion-grid>
            <ion-row>
              @for (table of tables(); track table.SNO) {
                <ion-col size="6" size-md="4" size-lg="3">
                  <ion-card
                    [style.background]="table.TBSTATUS === 'occupied' ? '#ffcccc' : '#ccffcc'"
                    (click)="selectTable(table)"
                  >
                    <ion-card-header>
                      <ion-card-title class="text-center">{{ table.TBNAME }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content class="text-center">
                      {{ table.TBSTATUS === 'occupied' ? 'Occupied' : 'Available' }}
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              } @empty {
                <ion-col>
                  <p class="text-center">No tables found.</p>
                </ion-col>
              }
            </ion-row>
          </ion-grid>
        }
      </div>
    </ion-content>
  `,
})
export class SelectTablePage implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  tables = signal<any[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.orderService.getTables().subscribe({
      next: (res: any) => {
        this.tables.set(res?.recordset ?? res ?? []);
        this.loading.set(false);
      },
      error: async (err: any) => {
        this.loading.set(false);
        const toast = await this.toastCtrl.create({
          message: `Failed to load tables: ${err.message ?? 'Unknown error'}`,
          duration: 1800,
          position: 'middle',
        });
        await toast.present();
      }
    });
  }

  selectTable(table: any): void {
    this.router.navigate(['/menu'], {
      queryParams: { id: table.SNO, TBNAME: table.TBNAME }
    });
  }
}
