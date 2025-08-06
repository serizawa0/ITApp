import { Component, OnInit } from '@angular/core';
import Item from '../../../../classes/Item';
import { ItemService } from '../../../services/itemService/item-service';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss'
})
export class ItemList implements OnInit{
  item:Item
  constructor(
    private itemS:ItemService
  ){
    this.item = new Item()
  }
  ngOnInit(): void {
    this.item = this.itemS.getItem()
    console.log(this.item);
    
  }
}
