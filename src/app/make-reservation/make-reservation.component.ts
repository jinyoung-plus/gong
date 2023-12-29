import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css']
})
export class MakeReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  currentUser: any;

  constructor(
      private fb: FormBuilder,
      private reservationService: ReservationService,
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        alert('Please log in to make a reservation.');
        this.router.navigate(['/u-login']); // Redirect to login page
      }
    });
  }

  initializeForm(): void {
    this.reservationForm = this.fb.group({
      venue: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(1)]],
      specialRequests: ['']
    });
  }

  submitReservation(): void {
    if (this.reservationForm.valid) {
      this.reservationService.createReservation({
        ...this.reservationForm.value,
        user_id: this.currentUser?.user_id
      }).subscribe({
        next: (response) => {
          alert('Your reservation has been submitted successfully! Thank you!');
          this.reservationForm.reset(); // Reset the form
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          alert('An error occurred while submitting your reservation.');
        }
      });
    } else {
      alert('Please fill in the reservation details.');
    }
  }
}

