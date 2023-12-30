import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurVenuesComponent } from './our-venues/our-venues.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ULoginComponent } from './u-login/u-login.component';
import { UserRequestsComponent} from './user-requests/user-requests.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }, // 기본 경로 설정
  { path: 'login', component: LoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'u-login', component: ULoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'our-venues', component: OurVenuesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'make-reservation', component: MakeReservationComponent },
  {
    path: 'user-requests',
    component: UserRequestsComponent,
    canActivate: [AuthGuard] // 사용자가 로그인한 경우에만 접근 가능하도록 설정
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { isAdminRoute: true } // Only admins can access
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
