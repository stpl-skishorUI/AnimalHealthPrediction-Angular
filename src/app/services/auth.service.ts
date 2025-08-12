import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiBaseUrl}/user/UserLogin`;
    private predictapiUrl = `${environment.apiBaseUrl}/HealthPrediction/predict`;

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
            catchError(this.handleError)
        );
    }

    predict(formData: any) {
        return this.http.post(this.predictapiUrl, formData).pipe(
            catchError(this.handleError)
        );
    }

    logout(): void {
        localStorage.removeItem('user');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('user');
    }

    getCurrentUser(): any {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            if (error.status === 401) {
                errorMessage = 'Invalid username or password';
            } else if (error.status === 0) {
                errorMessage = 'Unable to connect to server. Please check your connection.';
            } else {
                errorMessage = `Server Error: ${error.status} - ${error.message}`;
            }
        }

        return throwError(() => new Error(errorMessage));
    }
}
