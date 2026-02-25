import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonList, IonItem, IonIcon, IonSearchbar, IonButton,
  IonLabel, IonTextarea, IonToolbar, IonTitle, IonButtons,
  ModalController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBack, chevronForward, addCircle, removeCircle,
  create, warning, closeCircleOutline
} from 'ionicons/icons';
import { OrderService } from '../services/order.service';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    IonContent, IonList, IonItem, IonIcon, IonSearchbar, IonButton,
    IonLabel, IonTextarea, IonToolbar, IonTitle, IonButtons, FormsModule
  ],
  template: `
    <ion-content>
      <!-- Fixed top category bar -->
      <div class="d-flex align-items-center p-2 bg-light border-bottom" style="position:sticky;top:0;z-index:10">
        @if (selectedCategoryId()) {
          <ion-button fill="clear" (click)="clearCategory()">
            <ion-icon name="chevron-back"></ion-icon>
          </ion-button>
          <strong>{{ selectedCategoryName() }}</strong>
        } @else {
          <strong class="ms-2">Select a category</strong>
        }
      </div>

      <!-- Search bar -->
      <ion-searchbar
        [value]="searchTerm()"
        (ionInput)="updateSearch($event.detail.value ?? '')"
        placeholder="Search menu items..."
      ></ion-searchbar>

      <!-- Search results -->
      @if (searchTerm() !== '') {
        <ion-list>
          @for (item of searchedItems(); track item.ITEMCODE) {
            <ion-item>
              <ion-label>
                <h2>{{ item.ITEMNAME }}</h2>
              </ion-label>
              <div slot="end" class="d-flex align-items-center gap-2">
                <ion-button fill="clear" (click)="updateOrderItem(item, -1)">
                  <ion-icon name="remove-circle"></ion-icon>
                </ion-button>
                <span>{{ item.qty ?? 0 }}</span>
                <ion-button fill="clear" (click)="updateOrderItem(item, 1)">
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
          } @empty {
            <ion-item><ion-label>No results found</ion-label></ion-item>
          }
        </ion-list>
      } @else {
        <!-- Categories or items -->
        @if (!selectedCategoryId()) {
          <!-- Category list -->
          <ion-list>
            @for (cat of menuItems(); track cat.BTNNAME) {
              <ion-item (click)="getItems(cat)" button>
                <ion-label>{{ cat.BTNNAME }}</ion-label>
                <ion-icon slot="end" name="chevron-forward"></ion-icon>
              </ion-item>
            } @empty {
              <ion-item><ion-label>No categories available</ion-label></ion-item>
            }
          </ion-list>
        } @else {
          <!-- Sub-items list -->
          <ion-list>
            @for (item of subItems(); track item.ITEMCODE) {
              <ion-item>
                <ion-label>
                  <h2>{{ item.ITEMNAME }}</h2>
                </ion-label>
                <div slot="end" class="d-flex align-items-center gap-2">
                  <ion-button fill="clear" (click)="updateOrderItem(item, -1)">
                    <ion-icon name="remove-circle"></ion-icon>
                  </ion-button>
                  <span>{{ item.qty ?? 0 }}</span>
                  <ion-button fill="clear" (click)="updateOrderItem(item, 1)">
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
            } @empty {
              <ion-item><ion-label>No items in this category</ion-label></ion-item>
            }
          </ion-list>
        }
      }

      <!-- Fixed bottom bar -->
      <div style="position:fixed;bottom:0;left:0;right:0;z-index:10;background:#fff;padding:8px;display:flex;gap:8px;border-top:1px solid #ddd">
        <ion-button expand="block" style="flex:1" (click)="sendOrder()">Place Order</ion-button>
        <ion-button expand="block" fill="outline" style="flex:1" (click)="openOrderSummary()">View Order</ion-button>
      </div>
    </ion-content>
  `,
})
export class MenuPage implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);
  private router = inject(Router);

  menuItems = signal<any[]>([]);
  subItems = signal<any[]>([]);
  selectedCategoryId = signal<any>(null);
  selectedCategoryName = signal('');
  orderStorage = signal<any[]>([]);
  searchTerm = signal('');
  searchedItems = signal<any[]>([]);
  selectedTable = signal<any>(null);

  constructor() {
    addIcons({ chevronBack, chevronForward, addCircle, removeCircle, create, warning, closeCircleOutline });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTable.set({ SNO: params['id'], TBNAME: params['TBNAME'] });
    });
    this.loadCategories();
  }

  loadCategories(): void {
    this.orderService.getMenuCategories().subscribe({
      next: (res: any) => {
        this.menuItems.set(res?.recordset ?? res ?? []);
      },
      error: async (err: any) => {
        await this.showToast(`Failed to load categories: ${err.message}`);
      }
    });
  }

  getItems(category: any): void {
    this.selectedCategoryId.set(category.SNO ?? category.BTNCODE ?? category.id);
    this.selectedCategoryName.set(category.BTNNAME);
    this.orderService.getMenuItems(this.selectedCategoryId()).subscribe({
      next: (res: any) => {
        const items = (res?.recordset ?? res ?? []).map((i: any) => ({
          ...i,
          qty: this.getExistingQty(i),
          remarkOpen: false,
          ITEMREMARKS: this.getExistingRemarks(i),
        }));
        this.subItems.set(items);
      },
      error: async (err: any) => {
        await this.showToast(`Failed to load items: ${err.message}`);
      }
    });
  }

  private getExistingQty(item: any): number {
    const existing = this.orderStorage().find(o => o.ITEMCODE === item.ITEMCODE);
    return existing?.ITEMQUANTITY ?? 0;
  }

  private getExistingRemarks(item: any): string {
    const existing = this.orderStorage().find(o => o.ITEMCODE === item.ITEMCODE);
    return existing?.ITEMREMARKS ?? '';
  }

  clearCategory(): void {
    this.selectedCategoryId.set(null);
    this.selectedCategoryName.set('');
    this.subItems.set([]);
  }

  updateOrderItem(item: any, quan: number): void {
    const newQty = (item.qty ?? 0) + quan;
    item.qty = Math.max(0, newQty);
    if (newQty <= 0) {
      item.remarkOpen = false;
    }

    const current = this.orderStorage().filter(o => o.ITEMCODE !== item.ITEMCODE);
    if (item.qty > 0) {
      current.push({
        ITEMCODE: item.ITEMCODE,
        ITEMNAME: item.ITEMNAME,
        ITEMQUANTITY: item.qty,
        ITEMREMARKS: item.ITEMREMARKS ?? '',
      });
    }
    this.orderStorage.set(current);
  }

  async sendOrder(): Promise<void> {
    if (this.orderStorage().length === 0) {
      await this.showToast('No items in order');
      return;
    }
    this.orderService.placeOrder(this.orderStorage(), this.selectedTable()).subscribe({
      next: async () => {
        await this.showToast('Order placed successfully!');
        this.router.navigate(['/selectTable']).then(() => {
          window.location.reload();
        });
      },
      error: async (err: any) => {
        await this.showToast(`Failed to place order: ${err.message}`);
      }
    });
  }

  async openOrderSummary(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: OrderSummaryComponent,
      componentProps: {
        table: this.selectedTable(),
        orderSummary: this.orderStorage(),
      },
    });
    await modal.present();
  }

  updateSearch(val: string): void {
    this.searchTerm.set(val);
    if (!val) {
      this.searchedItems.set([]);
      return;
    }
    this.orderService.searchMenuItems(val).subscribe({
      next: (res: any) => {
        const items = (res?.recordset ?? res ?? []).map((i: any) => ({
          ...i,
          qty: this.getExistingQty(i),
          remarkOpen: false,
          ITEMREMARKS: this.getExistingRemarks(i),
        }));
        this.searchedItems.set(items);
      },
      error: async (err: any) => {
        await this.showToast(`Search failed: ${err.message}`);
      }
    });
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1800,
      position: 'middle',
    });
    await toast.present();
  }
}
