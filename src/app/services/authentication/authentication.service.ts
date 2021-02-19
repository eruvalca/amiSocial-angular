import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginViewModel } from '../../interfaces/loginViewModel';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RegisterViewModel } from '../../interfaces/registerViewModel';
import { AuthResponse } from '../../interfaces/authResponse';
import { TokenObj } from 'src/app/interfaces/tokenObj';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authUrl = "https://localhost:5001/auth/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient
  ) { }

  register(registerRequest: RegisterViewModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl + "register", registerRequest, this.httpOptions)
      .pipe(
        tap((response: AuthResponse) => {
          if (response.isSuccess) {
            if (response.token != null) {
              localStorage.removeItem("access_token");
              localStorage.setItem("access_token", response.token);
            } else {
              this.router.navigate(["login"]);
            }
          }
        }),
        catchError(error => this.handleError<AuthResponse>('login'))
      );
  }

  login(loginRequest: LoginViewModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl + "login", loginRequest, this.httpOptions)
      .pipe(
        tap((response: AuthResponse) => {
          if (response.isSuccess) {
            let tokenObj: TokenObj = {
              emailAddress: '',
              nameIdentifier: ''
            };

            const token = this.jwtHelper.decodeToken(response.token);
            tokenObj.emailAddress = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            tokenObj.nameIdentifier = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

            localStorage.removeItem("access_token");
            localStorage.setItem("access_token", response.token);
          }
        }),
        catchError(error => this.handleError<AuthResponse>('login'))
      );
  }

  logout(): void {
    localStorage.removeItem("access_token");
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("access_token");

    if (token === null) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
