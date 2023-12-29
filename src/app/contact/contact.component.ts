// src/app/contact/contact.component.ts

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact = { name: '', email: '', message: '', user_id: null };
  submissionMessage: string | null = null; // Ensure this is initialized
  currentUser: any; // 현재 사용자 정보를 저장할 변수

  constructor(
      private contactService: ContactService,
      private authService: AuthService,
      private router: Router
  ) { }


  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('Current user object:', user);
      // Now log the user_id to ensure it's being set correctly
      console.log('Logged-in user_id:', user.user_id);
      // Additional checks and logic...
    });
  }

  onSubmit(form: NgForm): void {
    console.log('currentUser:', this.currentUser); // Check if currentUser has user_id

    if (!this.currentUser || !this.currentUser.user_id) {
      this.submissionMessage = 'Please log in to send a message.';
      alert('Please log in to send a message.');
      this.router.navigate(['/u-login']);
      return;
    }
    // When constructing the submission object, include the user_id
    const submission = {
      ...form.value,
      user_id: this.currentUser.user_id
    };

    if (form.valid) {
      const submission = {
        ...form.value,
        user_id: this.currentUser.user_id // Extract user_id from the currentUser
      };

      console.log('Form submission data:', submission); // Log the submission data to debug

      this.contactService.sendContactForm(submission).subscribe(
          (response) => {
            // Handle the successful response here
            console.log('Form submission response:', response); // Debug log for successful submission
            this.submissionMessage = "Thank you! Your message has been sent.";
            form.reset(); // Reset the form after submission
          },
          (error) => {
            // Handle the error response here
            console.error('Error sending contact message:', error); // Debug log for any errors
            this.submissionMessage = "An error occurred. Please try again later.";

            // Check if the error is related to authentication
            if (error.status === 401) {
              // If it's an authentication error, redirect to login
              alert('Your session has expired. Please log in again.');
              this.router.navigate(['/u-login']);
            }
          }
      );
    } else {
      // If the form is not valid, ask the user to fill out all fields
      this.submissionMessage = 'Please fill out the form before sending.';
      alert('Please fill out the form before sending.');
    }
  }

}
