// src/app/models/reservation.model.ts

export interface Reservation {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone?: string;
    venue: string;
    reservation_date: Date;
    reservation_time: string;
    number_of_guests: number;
    special_requests?: string;
    status: string;
    admin_message?: string;
    created_at: Date;
}
