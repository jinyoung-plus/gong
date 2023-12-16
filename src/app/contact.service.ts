// src/app/contact.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contacts'; // 백엔드 API 경로

  constructor(private http: HttpClient) { }

  sendContactForm(contactData: any) {
    return this.http.post(this.apiUrl, contactData);
  }
}

