import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentaryInterface } from '../../../../interfaces/CommentaryInterface';
import { CommonModule } from '@angular/common';
import { SubTask } from '../../../../interfaces/TaskInterfaces';

@Component({
  selector: 'app-commentary',
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './commentary.html',
  styleUrl: './commentary.scss'
})
export class Commentary implements OnChanges, OnInit{
  @Input() subtaskId:string = ''
  @Input() subtask?:SubTask
  commentaires:CommentaryInterface[] = []
  commentaryForm:FormGroup
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
    const commentary = this.commentaryForm.get('commentary')?.value
    const author = this.commentaryForm.get('author')?.value
    if (commentary&&author) {
      // console.log(commentary)
      this.liaison.subCommentary(this.subtaskId, commentary, author).then(data => data.subscribe(
        element => {
          this.commentaires = element
          this.commentaryForm.reset()
        }
      ))
    }
  }
}
