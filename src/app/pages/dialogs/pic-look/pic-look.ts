import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileInterface } from '../../../../interfaces/FileInterface';
import { constrainedMemory } from 'process';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';

@Component({
  selector: 'app-pic-look',
  imports: [],
  templateUrl: './pic-look.html',
  styleUrl: './pic-look.scss'
})
export class PicLook implements OnChanges{
  @Input() picture?:FileInterface
  constructor(
    private liaison:LiaisonBack
  ){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['picture']){
      console.log('changement');
    }
  }
  getFileLink(fileName:string){
    const url = this.liaison.URL+'uploads/'+fileName
    return url
  }
  test(){
    console.log(this.picture);
    
  }
}
