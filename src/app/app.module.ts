import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
// Import your components here
import { AboutUsComponent } from './about-us/about-us.component';
import { OurVenuesComponent } from './our-venues/our-venues.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { MakeReservationComponent } from './make-reservation/make-reservation.component'; // Uncomment if you have this component
import { UserService } from './user.service';
import { HomeComponent } from './home/home.component'; // Adjust the path as necessary

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    OurVenuesComponent,
    EventsComponent,
    ContactComponent,
    MakeReservationComponent,
    HomeComponent, // Uncomment if you have this component
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Enable `fetch` for HttpClient
    FormsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    // Provide your services here
    UserService,
    { provide: APP_ID, useValue: 'gonggan-app' } // 'gonggan-app'으로 실제 ID를 설정
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
