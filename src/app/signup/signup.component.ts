import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  error: string | null = null; // Define the error property here

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.register(email, password).subscribe({
        next: (response) => {
          // If new user is registered, redirect to login page
          this.router.navigate(['/u-login']);
        },
        error: (error) => {
          // If email is already registered, provide feedback and redirect to login page
          if (error.error.message === 'User already exists') {
            this.error = 'User already exists, please login.';
            setTimeout(() => {
              this.router.navigate(['/u-login']);
            }, 3000); // Redirect after 3 seconds
          } else {
            // If other error occurs, display the error message
            this.error = error.error.message;
          }
        }
      });
    } else {
      // If form is not filled out, alert the user to fill in all fields
      this.error = 'Please fill in all fields.';
    }
  }
}
