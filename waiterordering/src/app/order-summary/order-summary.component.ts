import { Component, Input, OnInit, signal, inject } from '@angular/core';
import {
  IonContent, IonList, IonItem, IonIcon, IonRow, IonCol,
  IonLabel, IonButton, IonTextarea,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline, addCircle, removeCircle, create, warning } from 'ionicons/icons';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [IonContent, IonList, IonItem, IonIcon, IonRow, IonCol, IonLabel, IonButton, IonTextarea],
  template: `
    <ion-content class="ion-padding">
      <!-- Close button -->
      <div style="display:flex;justify-content:flex-end">
        <ion-button fill="clear" (click)="dismiss()">
          <ion-icon name="close-circle-outline" slot="icon-only" style="font-size:2rem"></ion-icon>
        </ion-button>
      </div>

      <!-- Previously placed orders -->
      <h3>Order Placed</h3>
      @if (prevOrderSummary().length > 0) {
        <ion-list>
          @for (item of prevOrderSummary(); track item.ITEMCODE) {
            <ion-item>
              <ion-label>
                <h2>{{ item.ITEMNAME }}</h2>
                <p>Qty: {{ item.ITEMQUANTITY }}</p>
                @if (item.ITEMREMARKS) {
                  <p>Remarks: {{ item.ITEMREMARKS }}</p>
                }
              </ion-label>
            </ion-item>
          }
        </ion-list>
      } @else {
        <div class="alert alert-info">No order placed yet</div>
      }

      <!-- Items added in current session -->
      <h3 class="mt-3">Items Added</h3>
      @if (orderSummary.length > 0) {
        <ion-list>
          @for (item of orderSummary; track item.ITEMCODE) {
            <ion-item>
              <ion-label>
                <h2>{{ item.ITEMNAME }}</h2>
                <p>Qty: {{ item.ITEMQUANTITY }}</p>
              </ion-label>
              <div slot="end" class="d-flex align-items-center gap-2">
                <ion-button fill="clear" (click)="changeQty(item, -1)">
                  <ion-icon name="remove-circle"></ion-icon>
                </ion-button>
                <span>{{ item.ITEMQUANTITY }}</span>
                <ion-button fill="clear" (click)="changeQty(item, 1)">
                  <ion-icon name="add-circle"></ion-icon>
                </ion-button>
                <ion-button fill="clear" (click)="item.remarkOpen = !item.remarkOpen">
                  <ion-icon name="create"></ion-icon>
                </ion-button>
              </div>
            </ion-item>
            @if (item.remarkOpen) {
              <ion-item>
                <ion-textarea
                  placeholder="Add remarks..."
                  [(ngModel)]="item.ITEMREMARKS"
                  rows="2"
                ></ion-textarea>
              </ion-item>
            }
          }
        </ion-list>
      } @else {
        <div class="alert alert-info">No items added</div>
      }
    </ion-content>
  `,
})
export class OrderSummaryComponent implements OnInit {
  private orderService = inject(OrderService);
  private modalCtrl = inject(ModalController);

  @Input() table: any;
  @Input() orderSummary: any[] = [];

  prevOrderSummary = signal<any[]>([]);

  constructor() {
    addIcons({ closeCircleOutline, addCircle, removeCircle, create, warning });
  }

  ngOnInit(): void {
    if (this.table?.SNO) {
      this.orderService.getOrder(this.table.SNO).subscribe({
        next: (res: any) => {
          this.prevOrderSummary.set(res?.recordset ?? res ?? []);
        },
        error: () => {
          this.prevOrderSummary.set([]);
        }
      });
    }
  }

  changeQty(item: any, delta: number): void {
    item.ITEMQUANTITY = Math.max(0, (item.ITEMQUANTITY ?? 0) + delta);
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }
}
