import { Component, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentaryInterface } from '../../../../interfaces/CommentaryInterface';
import { CommonModule } from '@angular/common';
import { SubTask } from '../../../../interfaces/TaskInterfaces';
import { elementAt } from 'rxjs';
import { IconComponent } from '../../../icon/icon-component/icon-component';

@Component({
  selector: 'app-commentary',
  imports: [
    ReactiveFormsModule, CommonModule, IconComponent
  ],
  templateUrl: './commentary.html',
  styleUrl: './commentary.scss'
})
export class Commentary implements OnChanges, OnInit{
  editState = false
  @Input() subtaskId:string = ''
  @Input() subtask?:SubTask
  @Output() action = new EventEmitter<string>()
  commentaires:CommentaryInterface[] = []
  commentaryForm:FormGroup
  editId:string = ''
  constructor(
    private liaison:LiaisonBack,
    private fB:FormBuilder
  ){
    this.commentaryForm = this.fB.group({
      commentary:[''],
      author:''
    })

  }
  ngOnInit(): void {
    this.getCommentaries()
    this.editState = false
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['subtaskId']){
      this.getCommentaries()
    }
  }
  getCommentaries(){
    this.liaison.getCommentaries(this.subtaskId).then(data => data.subscribe(
      element => {
        this.commentaires = element
      }
    ))
  }

  subCommentary(){
    const id = ''
    if(this.subtask){
        if (this.editState == true) {
        const commentary = this.commentaryForm.get('commentary')?.value
        const author = this.commentaryForm.get('author')?.value
        // console.log(typeof(commentary)+' '+author)
        if (commentary&&author) {
          // console.log(commentary)
          this.liaison.editCommentary(this.editId, this.subtask.id, commentary, author).then(data => data.subscribe(
            element => {
              this.commentaires = element
              this.editState = false
              this.commentaryForm.reset()
              this.emitAction()
            }
          ))
        }
      }
      else{
        const commentary = this.commentaryForm.get('commentary')?.value
        const author = this.commentaryForm.get('author')?.value
        if (commentary&&author) {
          // console.log(commentary)
          this.liaison.subCommentary(this.subtaskId, commentary, author).then(data => data.subscribe(
            element => {
              this.commentaires = element
              this.editState = false
              this.commentaryForm.reset()
              this.emitAction()
            }
          ))
        }
      }
    }
  }
  deleteCommentary(id:string){
    this.liaison.deleteCommentary(id).then(data => data.subscribe(
      element => {
        this.action.emit('action')
        this.getCommentaries()
      }
    ))
  }
  setEdit(item:CommentaryInterface){
    this.editState = true
    this.editId = item.id
    this.commentaryForm.setValue({
      commentary:item.content,
      author:item.author
    })
  }
  cancelEdit(){
    this.commentaryForm.reset()
    this.editState = false
    this.editId = ''
  }
  emitAction(){
    this.action.emit('changement')
  }
}
