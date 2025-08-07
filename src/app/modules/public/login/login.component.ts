import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Redirect to prediction-form if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/prediction-form'], { replaceUrl: true });
    }
  }

  login(): void {
    if (!this.username || !this.password) {
      this.toastr.error('Please enter both username and password');
      return;
    }

    this.isLoading = true;

    const credentials: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        this.isLoading = false;

        if (response.statusCode == '200') {

          response.user = response?.responseData;

          // Store user information
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }

          this.toastr.success('Login successful!');
          console.log('Redirecting to prediction form...');
          this.router.navigate(['/prediction-form'], { replaceUrl: true });
        } else {
          this.toastr.error(response.message || 'Login failed');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.error(error.message || 'Login failed. Please try again.');
      }
    });
  }
}
