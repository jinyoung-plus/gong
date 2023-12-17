import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (this.loginData.username === 'admin' && this.loginData.password === 'admingong') {
      // 로그인 성공, admin 페이지로 이동
      this.router.navigate(['/admin']);
    } else {
      // 로그인 실패, 에러 메시지 표시 등
      console.error('Invalid login credentials');
    }
  }
}
