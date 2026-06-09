import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = signal(false);

  loadingAndObserve<T>(observable: Observable<T>): Observable<T> {

    this.isLoading.set(true);

    return new Observable<T>((observer) => {
      observable.subscribe({
        next: (value) => observer.next(value),
        error: (err) => {
          console.error('Error:', err);
          this.isLoading.set(false);
          observer.error(err);
        },
        complete: () => {
          this.isLoading.set(false);
          observer.complete();
        }
      });
    });
  }
}
