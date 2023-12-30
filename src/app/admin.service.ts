import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable  } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _isAdminLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private logoutInProgress = false;
  private contactsUrl = 'http://localhost:3000/contacts';
  private reservationsUrl = 'http://localhost:3000/reservations';
  private loginUrl = 'http://localhost:3000/admin/login';

  constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // isPlatformBrowser를 사용하여 브라우저 환경인지 확인 후,
    // BehaviorSubject의 초기 값을 설정합니다.
    this._isAdminLoggedIn = new BehaviorSubject<boolean>(
        isPlatformBrowser(this.platformId) && !!localStorage.getItem('adminToken')
    );
  }
  // localStorage 접근 전에 브라우저에서 실행 중인지 확인
  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('adminToken');
    }
    return false; // 서버 사이드에서는 false를 반환
  }


  public loginAdmin(adminId: string, adminPassword: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { admin_id: adminId, password: adminPassword }).pipe(
        tap((response: LoginResponse) => {
          if (response.token) {
            localStorage.setItem('adminToken', response.token);
            this._isAdminLoggedIn.next(true);
          }
        })
    );
  }

  setAdminLoggedIn(loggedIn: boolean): void {

    this._isAdminLoggedIn.next(loggedIn);
  }

// Call this method to check if the admin is logged in
    get isAdminLoggedIn(): Observable<boolean> {
        return this._isAdminLoggedIn.asObservable();
    }

  // Method to handle admin logout
  adminLogout(): void {
    if (!this.logoutInProgress) {
      this.logoutInProgress = true;
      // Perform necessary logout actions, like clearing the token
      localStorage.removeItem('adminToken'); // Assuming token is stored in localStorage
      this.setAdminLoggedIn(false);
      // Trigger logout event/notification here if needed
      // Reset the flag after logout actions are completed
      this.logoutInProgress = false;
    }
  }


  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.contactsUrl);
  }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.reservationsUrl);
  }

  updateContactStatus(contactId: number, newStatus: string): Observable<any> {
    // Replace 'your-api-endpoint' with the correct path to your backend API.
    return this.http.put(`${this.contactsUrl}/${contactId}`, { status: newStatus });
  }

  updateContactMessage(contactId: number, newMessage: string): Observable<any> {
    return this.http.put(`${this.contactsUrl}/${contactId}`, { admin_message: newMessage });
  }

  updateReservationStatus(reservationId: number, newStatus: string): Observable<any> {
    const url = `${this.reservationsUrl}/${reservationId}/status`;
    return this.http.put(url, { status: newStatus });
  }

  updateReservationMessage(reservationId: number, newMessage: string): Observable<any> {
    const url = `${this.reservationsUrl}/${reservationId}/message`;
    return this.http.put(url, { admin_message: newMessage });
  }

  registerAdmin(adminId: string, adminPassword: string): Observable<any> {
    const adminCredentials = { adminId, adminPassword };
    return this.http.post('http://localhost:3000/admin/register', adminCredentials);
  }
}
