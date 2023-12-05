// src/app/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000'; // Node.js 서버 URL

  constructor(private http: HttpClient) {}

  saveUserName(userName: string) {
    return this.http.post(`${this.baseUrl}/users`, { username: userName });
  }
}
