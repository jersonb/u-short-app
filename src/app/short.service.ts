import { inject, Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { ItemCreateRequest } from './models/requests/item-create-request';
import { filter, map, Observable } from 'rxjs';
import { ItemCreateResponse } from './models/responses/item-create-response';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ItemData } from './models/item-data';

@Injectable({
  providedIn: 'root',
})
export class ShortService {
  private readonly loadingService = inject(LoadingService);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiRoot;
  private readonly apiEndpoint = `${this.apiUrl}/short`;

  getUrl(code: string): Observable<string> {
    return this.loadingService.loadingAndObserve<string>(
      this.http.get<string>(`${this.apiEndpoint}/${code}/redirect`));
  }

  createShortItem(item: ItemCreateRequest): Observable<ItemCreateResponse> {
    return this.loadingService.loadingAndObserve<ItemCreateResponse>(
      this.http
        .post<ItemCreateResponse>(this.apiEndpoint, item, {
          observe: 'response',
        })
        .pipe(
          filter((response) => response.status === 201),
          map((response) => {
            const item = response.body as ItemCreateResponse;
            console.log(
              'Item criado com sucesso:',
              response.headers.get('Location'),
            );
            return item;
          }),
        ),
    );
  }

  listShortItems(): Observable<ItemData[]> {
    return this.loadingService.loadingAndObserve<ItemData[]>(
      this.http.get<ItemData[]>(this.apiEndpoint),
    );
  }
}
