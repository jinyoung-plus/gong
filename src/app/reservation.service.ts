import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from './models/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    createReservation(reservationData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/reservations`, reservationData);
    }

    // ReservationService 내부의 메소드
    getUserReservations(userId: number): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`http://localhost:3000/reservations/user/${userId}`);
    }
}
