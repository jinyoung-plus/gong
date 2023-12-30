import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  private adminLoginSubscription!: Subscription; // Non-null assertion operator
  private isFirstLoad = true; // flag to check if it's the first load
  contacts: any[] = [];
  reservations: any[] = [];

    constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminLoginSubscription = this.adminService.isAdminLoggedIn.subscribe(isLoggedIn => {
      if (!isLoggedIn && this.isFirstLoad) {
        alert('Administrator login is required.'); // Alert the user to log in as admin
        this.router.navigate(['/admin-login']); // Redirect to the admin login page
        this.isFirstLoad = false; // Update the flag after the initial load
      } else if (isLoggedIn) {
        this.loadContacts();
        this.loadReservations();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.adminLoginSubscription) {
      this.adminLoginSubscription.unsubscribe();
    }
  }

  loadContacts(): void {
    this.adminService.getContacts().subscribe(
      data => this.contacts = data,
      error => console.error('Error fetching contacts', error)
    );
  }

  loadReservations(): void {
    this.adminService.getReservations().subscribe(
      data => this.reservations = data,
      error => console.error('Error fetching reservations', error)
    );
  }

  updateContactStatus(contactId: number, newStatus: string): void {
    this.adminService.updateContactStatus(contactId, newStatus).subscribe({
      next: () => console.log('Contact status updated'),
      error: (error: any) => console.error('Error updating contact status', error)
    });
  }

  updateContactMessage(contactId: number, newMessage: string): void {
    this.adminService.updateContactMessage(contactId, newMessage)
        .subscribe({
          next: () => console.log('Contact message updated'),
          error: error => console.error('Error updating contact message', error)
        });
  }

  updateReservationStatus(reservationId: number, newStatus: string): void {
    this.adminService.updateReservationStatus(reservationId, newStatus)
        .subscribe({
          next: () => console.log('Reservation status updated'),
          error: error => console.error('Error updating reservation status', error)
        });
  }

  updateReservationMessage(reservationId: number, newMessage: string): void {
    this.adminService.updateReservationMessage(reservationId, newMessage)
        .subscribe({
          next: () => console.log('Reservation message updated'),
          error: error => console.error('Error updating reservation message', error)
        });
  }
}
