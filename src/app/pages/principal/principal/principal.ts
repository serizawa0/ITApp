import { Component } from '@angular/core';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';
import User from '../../../../classes/User';
import { ItemDialog } from '../../dialogs/item-dialog/item-dialog';
import Item from '../../../../classes/Item';
import { Router, RouterOutlet } from '@angular/router';
import { ItemService } from '../../../services/itemService/item-service';

@Component({
  selector: 'app-principal',
  imports: [
    ItemDialog, RouterOutlet
  ],
  templateUrl: './principal.html',
  styleUrl: './principal.scss'
})
export class Principal {
  users:User[]  =  []
  items:Item[] = []
  constructor(
    private liaisonService:LiaisonBack,
    private router:Router,
    private itemS:ItemService
  ){
    liaisonService.getUsers().then(data => data.subscribe(
      element => this.users = element
    ))
    liaisonService.getItems().then(data => data.subscribe(
      element => {
        this.items = element
      }
    ))
  }

  getItems(){
    this.liaisonService.getItems().then(data => data.subscribe(
      element => {
        this.items = element
      }
    ))
  }
  handleValue(val:string){
    this.getItems()
  }
  itemClicked(item:Item){
    this.itemS.setItem(item).then(data => {
      this.router.navigate(['/item'])
    })
  }
}
