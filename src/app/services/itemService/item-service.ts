import { Injectable } from '@angular/core';
import Item from '../../../classes/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  item:Item
  constructor(){
    this.item = new Item()
  }
  async setItem(item:Item){
    this.item = item
    return 'okey'
  }
  getItem(){
    return this.item
  }
}
