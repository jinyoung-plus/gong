//u-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-u-login',
    templateUrl: './u-login.component.html',
    styleUrls: ['./u-login.component.css']
})
export class ULoginComponent {
    loginData = {
        email: '',
        password: ''
    };

    constructor(private authService: AuthService, private router: Router) { }

    onLogin(): void {
        if (!this.loginData.email || !this.loginData.password) {
            // If the email or password fields are empty
            alert('Please enter both email and password.');
            return;
        }

        this.authService.login(this.loginData.email, this.loginData.password)
            .subscribe({
                next: (data) => {
                    // Assuming the data contains the user and token
                    // Store the token and user details as needed
                    alert('Login successful!');
                    // Navigate to the home page or user dashboard
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    // Handle the login error (e.g., user not found or wrong credentials)
                    alert('Login failed: Invalid email or password.');
                    console.error('Login failed:', error);
                }
            });
    }
}


