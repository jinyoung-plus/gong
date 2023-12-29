import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReservationService } from '../reservation.service';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model'; // Update this path as necessary
import { Reservation } from '../models/reservation.model'; // Update this path as necessary

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {
  contacts: Contact[] = [];
  reservations: Reservation[] = [];
  userId!: number; // Non-null assertion operator

  constructor(
      private contactService: ContactService,
      private reservationService: ReservationService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    // It's assumed that currentUserValue always exists. If not, additional checks are needed.
    this.userId = this.authService.currentUserValue.user_id;
    this.fetchUserRequests();
  }

  fetchUserRequests(): void {
    if (this.userId) {
      this.contactService.getUserContacts(this.userId).subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
      this.reservationService.getUserReservations(this.userId).subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
      });
    }
  }
}


