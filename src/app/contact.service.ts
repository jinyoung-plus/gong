// src/app/contact.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  submitContactForm(contactData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contacts`, contactData);
  }
}
