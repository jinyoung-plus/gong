import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
    ) {
        // Check if running in the browser and initialize currentUserSubject with potential user information
        const storedUser = isPlatformBrowser(this.platformId) ? localStorage.getItem('currentUser') : null;
        this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    }
    // The loginAdmin method
    loginAdmin(username: string, password: string): Observable<any> {
        // Define the body of the request
        const body = { username, password };

        // Make an HTTP POST request to the admin login endpoint
        return this.http.post<any>(`http://localhost:3000/admin/login`, body)
            .pipe(
                map(response => {
                    // If there's a token in the response, the admin is logged in
                    if (response.token) {
                        // Store the admin credentials and token in local storage or a suitable place
                        localStorage.setItem('adminToken', response.token);
                        // You can also store other admin details as needed
                    }
                    return response;
                })
            );
    }


    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public get currentUser(): Observable<any> {
        return this.currentUserSubject.asObservable();
    }


    register(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:3000/register', { email, password });
    }

    // Inside your AuthService

    login(email: string, password: string): Observable<any> {
        // @ts-ignore
        return this.http.post<any>(`http://localhost:3000/login`, { email, password })
            .pipe(
                map(response => {
                    // Check the response contains the user object with user_id
                    if (response.user && response.user.user_id && response.token) {
                        // Save the user details in local storage or in-memory storage
                        localStorage.setItem('currentUser', JSON.stringify(response.user));
                        this.currentUserSubject.next(response.user);
                    }
                    return response.user;
                }),
                //catchError(error => {
                    // handle error
               // })
            );
    }



    logout(): void {
        // Remove user from local storage and update the currentUserSubject
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('currentUser');
        }
        this.currentUserSubject.next(null);

        // Navigate to the login page
        this.router.navigate(['/u-login']).then(() => {
            window.location.reload();
        });
    }
}

