import { Component, computed, input } from '@angular/core';
import { ItemData } from '../models/item-data';
import { DatePipe } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [DatePipe, QRCodeComponent, RouterLink],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {
  itemData = input.required<ItemData>();

  url = computed<string>(() => `${environment.origin}/${this.itemData().code}`);

  qrcodeWidth = window.innerWidth * 0.5;
}
