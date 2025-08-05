import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Redirect to prediction-form if already logged in
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.router.navigate(['/prediction-form'], { replaceUrl: true });
      return;
    }
    this.http.get('assets/data/login-credentials.json').subscribe(data => {
      this.credentials = data;
    });
  }

  login(): void {
    if (!this.credentials) {
      this.toastr.error('Credentials not loaded yet. Please try again.');
      return;
    }
    if (this.username === this.credentials.username && this.password === this.credentials.password) {
      this.toastr.success('Login successful!');
      localStorage.setItem('username', this.username);
      this.router.navigate(['/prediction-form'], { replaceUrl: true });
    } else {
      this.toastr.error('Invalid username or password.');
    }
  }
}
