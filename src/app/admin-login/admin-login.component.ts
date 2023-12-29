
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {

  // Add showLogin variable
  showLogin: boolean = true; // Start with the login form displayed

  loginData = {
    adminId: '',
    adminPassword: ''
  };
  registerData = {
    adminId: '',
    adminPassword: ''
  };

  constructor(private router: Router, public adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.isAdminLoggedIn().subscribe(loggedIn => {
      this.showLogin = !loggedIn; // showLogin is true when loggedIn is false, and vice versa
    });

  }

  onALogin(): void {
    this.adminService.loginAdmin(this.loginData.adminId, this.loginData.adminPassword)
        .subscribe({
          next: (response: any) => {
            // Assuming the response includes some form of success indication
            this.router.navigate(['/admin']);
          },
          error: (error: any) => {
            console.error('Invalid login credentials');
            // Handle the error, e.g., show an error message to the user
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
  onAdminLogout(): void {
    this.adminService.adminLogout(); // This should clear the admin's auth state
    this.router.navigate(['/']); // Redirect to home or login page after logout
  }
}
