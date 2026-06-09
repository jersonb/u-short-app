import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AuthService } from '../auth.service';
import {
  debounce,
  email,
  form,
  FormField,
  required,
} from '@angular/forms/signals';
import { LoginRequest } from '../models/requests/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  loginModel = signal<LoginRequest>({ email: '' });

  ngOnInit(): void {
    if (this.authService.isAuthorized()) {
      this.router.navigateByUrl('l');
    }
  }

  loginForm = form(this.loginModel, (schema) => {
    debounce(schema.email, 500);
    required(schema.email, { message: 'Preencha o email' });
    email(schema.email, { message: 'Email Inválido' });
  });

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.loginForm().valid()) {
      this.authService.login(this.loginModel()).subscribe({
        complete: () => {
          this.router.navigateByUrl('l');
        },
      });
    }
  }
}
