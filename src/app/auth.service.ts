import { inject, Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { LoadingService } from './loading.service';
import { LoginRequest } from './models/requests/login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LoginResponse } from './models/responses/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private readonly AUTHORIZED_KEY = 'authorized';

  isAuthorized = signal(false);

  loadingService = inject(LoadingService);
  constructor() {
    this.checkAuth();
  }
  get userid(): string {
    const id = localStorage.getItem(this.AUTHORIZED_KEY);
    if (id) {
      return id;
    }
    throw new Error('Sem usuário');
  }
  
  login(loginRequest: LoginRequest): Observable<void> {
    return this.loadingService.loadingAndObserve(
      new Observable<void>((observer) => {
        this.http
          .post<LoginResponse>(
            `${environment.apiRoot}/auth/login`,
            loginRequest,
            { observe: 'response', responseType: 'json' },
          )
          .subscribe({
            next: (response) => {
              if (!response.ok) {
                throw new Error(`Login failed with status ${response.status}`);
              }

              if (!response.body) {
                throw new Error('Login failed body is empty');
              }

              const token = (response.body as LoginResponse).token;

              if (!token) {
                throw new Error('Login failed token is empty');
              }

              localStorage.setItem(this.AUTHORIZED_KEY, token);
              this.checkAuth();
            },
            error: (error) => {
              console.error('Login error:', error);
              localStorage.removeItem(this.AUTHORIZED_KEY);
              this.checkAuth();
            },
            complete: () => {
              observer.complete();
            },
          });
      }),
    );
  }

  logout(): Observable<void> {
    return this.loadingService.loadingAndObserve(
      new Observable<void>((observer) => {
        of(false)
          .pipe(delay(1000))
          .subscribe({
            next: () => {
              localStorage.removeItem(this.AUTHORIZED_KEY);
            },
            complete: () => {
              this.checkAuth();
              observer.complete();
            },
          });
      }),
    );
  }



  private checkAuth() {
    const authKey = localStorage.getItem(this.AUTHORIZED_KEY);
    this.isAuthorized.set(!!authKey && this.isValidAuthKey(authKey));
  }

  private isValidAuthKey(key: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(key);
  }
}
