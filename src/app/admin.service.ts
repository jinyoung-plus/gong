import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminLoggedIn = new BehaviorSubject<boolean>(false);
  private contactsUrl = 'http://localhost:3000/contacts';
  private reservationsUrl = 'http://localhost:3000/reservations';
  private loginUrl = 'http://localhost:3000/admin/login';

  constructor(private http: HttpClient) { }

  // Provide observable for components to subscribe
  isAdminLoggedIn(): Observable<boolean> {
    return this.adminLoggedIn.asObservable();
  }


  public loginAdmin(adminId: string, password: string) {
    this.adminLoggedIn.next(true);
    return this.http.post(this.loginUrl, { admin_id: adminId, password: password });
  }



  // Method to update the admin login status
  setAdminLoggedIn(loggedIn: boolean): void {
    this.adminLoggedIn.next(loggedIn);
  }

  // Method to handle admin logout
  public adminLogout(): void {
    // Perform necessary logout actions, like clearing the token
    this.setAdminLoggedIn(false);
    this.adminLoggedIn.next(false);
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
