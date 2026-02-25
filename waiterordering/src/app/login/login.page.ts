import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule, CommonModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  IonContent, IonRow, IonCol, IonItem, IonInput, IonButton,
  ToastController
} from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonContent, IonRow, IonCol, IonItem, IonInput, IonButton, FormsModule, CommonModule],
  template: `
    <ion-content class="ion-padding">
      @if (isIP()) {
        <div class="container mt-4">
          <div class="row justify-content-center">
            <div class="col-12 col-md-6">
              <h2 class="text-center mb-4">Waiter Login</h2>
              <ion-item>
                <ion-input
                  label="Username"
                  labelPlacement="floating"
                  [value]="userName()"
                  (ionInput)="userName.set($event.detail.value ?? '')"
                  type="text"
                ></ion-input>
              </ion-item>
              <ion-item class="mt-2">
                <ion-input
                  label="Password"
                  labelPlacement="floating"
                  [value]="password()"
                  (ionInput)="password.set($event.detail.value ?? '')"
                  type="password"
                ></ion-input>
              </ion-item>
              <div class="mt-4">
                <ion-button expand="block" (click)="login()">Login</ion-button>
              </div>
              <div class="mt-2">
                <ion-button expand="block" fill="outline" (click)="isIP.set(false)">Change Server IP</ion-button>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="container mt-4">
          <div class="row justify-content-center">
            <div class="col-12 col-md-6">
              <h2 class="text-center mb-4">Connect to Server</h2>
              <ion-item>
                <ion-input
                  label="Server IP Address"
                  labelPlacement="floating"
                  [value]="ip()"
                  (ionInput)="ip.set($event.detail.value ?? '')"
                  type="text"
                  placeholder="e.g. 192.168.1.100"
                ></ion-input>
              </ion-item>
              <div class="mt-4">
                <ion-button expand="block" (click)="submitIp()">Connect</ion-button>
              </div>
            </div>
          </div>
        </div>
      }
    </ion-content>
  `,
})
export class LoginPage implements OnInit {
  private http = inject(HttpClient);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  userName = signal('');
  password = signal('');
  ip = signal('');
  isIP = signal(false);

  ngOnInit(): void {
    const savedIp = localStorage.getItem('ip');
    if (savedIp) {
      this.ip.set(savedIp);
      this.isIP.set(true);
    }
  }

  async submitIp(): Promise<void> {
    const ipVal = this.ip().trim();
    if (!ipVal) {
      await this.showToast('Please enter the server IP address');
      return;
    }

    await this.showToast('Connecting to server...');

    const isNative = Capacitor.isNativePlatform();
    const url = isNative ? `http://${ipVal}:5000` : '/proxy';
    const headers = !isNative ? new HttpHeaders({ 'x-target-ip': ipVal }) : new HttpHeaders();

    this.http.get(url, { headers, responseType: 'text' }).subscribe({
      next: async (val) => {
        if (val === 'App Backend Ready') {
          localStorage.setItem('ip', ipVal);
          this.isIP.set(true);
          await this.showToast('Connected successfully!');
        } else {
          await this.showToast('Server responded but not recognized');
        }
      },
      error: async (err) => {
        await this.showToast(`Connection failed: ${err.message ?? 'Unknown error'}`);
      }
    });
  }

  async login(): Promise<void> {
    const userNameVal = this.userName().trim();
    const passwordVal = this.password().trim();

    if (!userNameVal || !passwordVal) {
      await this.showToast('Please enter username and password');
      return;
    }

    let deviceId = 'unknown';
    try {
      const info = await Device.getId();
      deviceId = (info as any).identifier ?? (info as any).uuid ?? (info as any).id ?? 'unknown';
    } catch {}

    try {
      const obs = await this.orderService.loginUser({ userName: userNameVal, password: passwordVal });
      obs.subscribe({
        next: async (resp: any) => {
          if (resp?.recordset?.length > 0) {
            this.router.navigate(['/selectTable']);
          } else {
            await this.showToast('Invalid credentials. Please try again.');
          }
        },
        error: async (err: any) => {
          await this.showToast(`Login failed: ${err.status ?? err.message ?? 'Unknown error'}`);
        }
      });
    } catch (err: any) {
      const triedUrls = err.triedUrls ?? [];
      console.error('Login failed, tried URLs:', triedUrls);
      await this.showToast(`Login failed. Tried ${triedUrls.length} endpoints.`);
    }
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
