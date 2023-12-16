import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurVenuesComponent } from './our-venues/our-venues.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';



const routes: Routes = [
  { path: '', component: HomeComponent }, // 기본 경로 설정
  { path: 'about-us', component: AboutUsComponent },
  { path: 'our-venues', component: OurVenuesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'make-reservation', component: MakeReservationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
