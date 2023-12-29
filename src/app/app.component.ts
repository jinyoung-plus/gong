import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GP3';
  userName: string = ''; // 사용자 이름을 저장할 변수
  message: string = ''; // 사용자에게 표시할 메시지를 저장할 변수

    constructor(public authService: AuthService, private router: Router) {}

  goToUserRequests(): void {
    this.router.navigate(['/user-requests']);
  }

  ngOnInit() {
    // 사용자 상태 변화를 관찰하고, 변화가 있을 때마다 동작합니다.
    this.authService.currentUser.subscribe((user: any) => {
      if (user) {
        // 로그인한 경우, 사용자 이름과 환영 메시지 업데이트
        this.userName = user.email; // 이메일을 사용자 이름으로 설정
        this.message = `Welcome, ${this.userName}`;
      } else {
        // 로그아웃한 경우, 사용자 이름과 메시지 초기화
        this.userName = '';
        this.message = '';
      }
    });
  }
  onLogout() {
    this.authService.logout();
    // The user should be redirected to the login page within the logout method
  }

}


