import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { Header } from './header/header';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  authService = inject(AuthService);
  loadingService = inject(LoadingService);
}
