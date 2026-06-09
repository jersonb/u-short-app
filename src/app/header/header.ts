import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(AuthService);
  router = inject(Router);

  onLogout(event: PointerEvent) {
    event.preventDefault();

    this.authService.logout().subscribe({
      complete: () => {
        this.router.navigateByUrl('in');
      },
    });
  }
}
