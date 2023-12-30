import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GP3';
  isAdminLoggedIn$: Observable<boolean>;

    constructor(
      public authService: AuthService,
      private router: Router,
      private adminService: AdminService
    ) {
      this.isAdminLoggedIn$ = this.adminService.isAdminLoggedIn;
    }

  ngOnInit() {
    // Your initialization code, if any
  }

  goToUserRequests(): void {
    this.router.navigate(['./user-requests']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to home on logout
    // The user should be redirected to the login page within the logout method
  }

  onAdminLogout(): void {
    this.adminService.adminLogout();
    // After logout, redirect and show alert
    this.router.navigate(['/']).then(() => {
      alert('Administrator logged out successfully.');
    });
  }
}


