// src/app/contact.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contacts'; // 백엔드 API 경로

  constructor(private http: HttpClient) { }

  sendContactForm(contactData: any) {
    console.log('Sending contact data:', contactData); // Add this line to debug  디버깅용
    return this.http.post(this.apiUrl, contactData);
  }

  // ContactService 내부의 메소드
  getUserContacts(userId: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/user/${userId}`);
  }
}

