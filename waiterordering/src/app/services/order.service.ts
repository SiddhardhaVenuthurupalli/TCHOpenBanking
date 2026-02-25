import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  private get ip(): string {
    return localStorage.getItem('ip') ?? '127.0.0.1';
  }

  private get isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  private get baseUrl(): string {
    if (this.isNative) {
      return `http://${this.ip}:5000/api/v1`;
    }
    return '/proxy/api/v1';
  }

  private get headers(): HttpHeaders {
    if (!this.isNative) {
      return new HttpHeaders({ 'x-target-ip': this.ip });
    }
    return new HttpHeaders();
  }

  getTables(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tables`, { headers: this.headers });
  }

  getTableStatus(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablestatus?id=${id}`, { headers: this.headers });
  }

  getMenuCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`, { headers: this.headers });
  }

  getMenuItems(categoryId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/menuitems?id=${categoryId}`, { headers: this.headers });
  }

  searchMenuItems(searchTerm: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchmenu?searchTerm=${searchTerm}`, { headers: this.headers });
  }

  getOrder(tableId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/order?id=${tableId}`, { headers: this.headers });
  }

  placeOrder(order: any, table: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/neworder`, { order, table }, { headers: this.headers });
  }

  async loginUser(data: { userName: string; password: string }): Promise<Observable<any>> {
    const ip = this.ip;
    const isNative = this.isNative;

    const urlVariants = isNative
      ? [
          `http://${ip}:5000/api/v1/checkUser`,
          `http://${ip}:5000/api/v1/checkuser`,
          `http://${ip}:5000/checkUser`,
          `http://${ip}:5000/checkuser`,
        ]
      : [
          '/proxy/api/v1/checkUser',
          '/proxy/api/v1/checkuser',
          '/proxy/checkUser',
          '/proxy/checkuser',
        ];

    const payloads = [
      { userName: data.userName, password: data.password },
      { username: data.userName, password: data.password },
    ];

    const triedUrls: string[] = [];
    const errors: any[] = [];

    for (const url of urlVariants) {
      for (const payload of payloads) {
        triedUrls.push(`${url} with payload keys: ${Object.keys(payload).join(',')}`);
        try {
          const headers = !isNative ? new HttpHeaders({ 'x-target-ip': ip }) : new HttpHeaders();
          const result = await this.http.post(url, payload, { headers }).toPromise();
          return new Observable(observer => {
            observer.next(result);
            observer.complete();
          });
        } catch (err: any) {
          errors.push(err);
        }
      }
    }

    throw Object.assign(new Error('All login attempts failed'), { triedUrls, errors });
  }
}
