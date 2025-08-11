import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { log } from 'node:console';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';

@Component({
  selector: 'app-item-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './item-dialog.html',
  styleUrl: './item-dialog.scss'
})
export class ItemDialog {
  @Output() output = new EventEmitter<string>()
  itemForm: FormGroup
  constructor(
    private fB: FormBuilder,
    private lisaisonBack:LiaisonBack
  ){
    this.itemForm = this.fB.group({
      libele:''
    })
  }
  validate(){
    const libele = this.itemForm.get('libele')?.value
    if (libele) {
      this.lisaisonBack.addItem(libele).then(data => data.subscribe(
        element => {
          this.output.emit(element)
        }
      ))
    }
  }
}
