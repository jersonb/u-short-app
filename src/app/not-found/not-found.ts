import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShortService } from '../short.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit {
  private readonly router = inject(Router);
  private readonly shortService = inject(ShortService);
  protected isSuccess = false;
  ngOnInit() {
    const code = this.router.routerState.snapshot.url.replace('/', '');

    this.shortService.getUrl(code).subscribe((url) => {
      if (url) {
        this.isSuccess = true;

        setInterval(() => {
          globalThis.open(url, '_self');
        }, 3000);
      }
    });
  }
}
