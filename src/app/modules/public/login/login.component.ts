import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  credentials: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('assets/login-credentials.json').subscribe(data => {
      this.credentials = data;
    });
  }

  login(): void {
    if (!this.credentials) {
      alert('Credentials not loaded yet. Please try again.');
      return;
    }
    if (this.username === this.credentials.username && this.password === this.credentials.password) {
      alert('Login successful!');
      localStorage.setItem('username', this.username);
      this.router.navigate(['/prediction-form']);
    } else {
      alert('Invalid username or password.');
    }
  }
}
