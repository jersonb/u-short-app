import { Component, inject, OnInit } from '@angular/core';
import { ItemData } from '../models/item-data';
import { Item } from '../item/item';
import { ShortService } from '../short.service';

@Component({
  selector: 'app-item-list',
  imports: [Item],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList implements OnInit {
  protected items: ItemData[] = [];
  
  shortService = inject(ShortService);
  
  ngOnInit(): void {
    this.shortService.listShortItems()
    .subscribe((items) => {
      this.items = items;
    });
  }

}
