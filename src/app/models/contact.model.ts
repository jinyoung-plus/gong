// src/app/models/contact.model.ts

export interface Contact {
    id: number;
    user_id: number;
    name: string;
    email: string;
    message: string;
    status: string;
    admin_message?: string;
    created_at: Date;
}
