// In admin-login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginData = {
    adminId: '',
    adminPassword: ''
  };
  registerData = {
    adminId: '',
    adminPassword: ''
  };

  constructor(
    private router: Router,
    public adminService: AdminService
  ) {}

  ngOnInit(): void {
    // Check the admin login status on init and adjust the UI accordingly
    this.adminService.isAdminLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        // If the admin is already logged in, navigate away from the login page
        this.router.navigate(['/admin']);
      }
      // Otherwise, stay on the login page and show the login form
    });
  }

    onALogin(): void {
        this.adminService.loginAdmin(this.loginData.adminId, this.loginData.adminPassword)
            .subscribe({
                next: (response: any) => {
                    console.log('here1:', response);
                    // If a token is present, we can assume the login was successful
                    if (response && response.token) {
                        alert('Admin login successful');
                        this.adminService.setAdminLoggedIn(true);
                        this.router.navigate(['/admin']);
                    } else {
                        // No token means login failed
                        alert('Login failed: ' + response.message);
                        this.adminService.setAdminLoggedIn(false);
                    }
                },
                error: (error: any) => {
                    console.log('Login error:', error);
                    alert('Login failed: ' + (error.error.message || 'Invalid login credentials'));
                    this.adminService.setAdminLoggedIn(false);
                }
            });
    }


    onARegister(): void {
    this.adminService.registerAdmin(this.registerData.adminId, this.registerData.adminPassword)
        .subscribe({
          next: (response: any) => {
            // Handle successful registration
            console.log('Admin registered successfully');
            // Optionally auto-login the admin or navigate to a confirmation page
          },
          error: (error: any) => {
            console.error('Registration failed');
            // Handle the error
          }
        });
  }

}
