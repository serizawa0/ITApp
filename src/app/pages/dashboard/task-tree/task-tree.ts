import { Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { SubTask, Task } from '../../../../interfaces/TaskInterfaces';
import { log } from 'node:console';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';
import { elementAt } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FileList } from '../../dialogs/file-list/file-list';
import { Commentary } from '../../dialogs/commentary/commentary';
import { CommonModule } from '@angular/common';
import { Loading } from '../../../popups/loading/loading';
import { DialogService } from '../../../services/Dialog/dialog-service';
import { IconComponent } from '../../../icon/icon-component/icon-component';

@Component({
  selector: 'app-task-tree',
  imports: [
    ReactiveFormsModule, CommonModule, IconComponent
  ],
  templateUrl: './task-tree.html',
  styleUrl: './task-tree.scss'
})
export class TaskTree implements OnInit{
  @Output() maj = new EventEmitter<string>()
  @Input() taskTitle:string=''
  @Input() task!:SubTask
  subTaskForm:FormGroup
  placeHolder = ''
  private overlayRef: OverlayRef | null = null;
  constructor(
    private formBuilder:FormBuilder,
    private liaisonBackS:LiaisonBack,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private dialogService:DialogService

  ){
    this.subTaskForm = this.formBuilder.group({
      title:'',
      deadLine:''
    })
  }
  ngOnInit(): void {
    this.placeHolder = 'new subtask to ' + this.task.title
  }

  openDialog(){
    const positionStrategy =  this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically()

    const overlayRef = this.overlay.create({
      hasBackdrop:true,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block()
    })

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose()
    })
    const fileListPortal = new ComponentPortal(FileList)
    const componentRef = overlayRef.attach(fileListPortal)
    componentRef.instance.id =this.task.id
    componentRef.instance.taskId =this.task.taskId
    componentRef.instance.taskTitle = this.taskTitle
  }

  openCommentaries(){
    
    const positionStrategy =  this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically()

    const overlayRef = this.overlay.create({
      hasBackdrop:true,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block()
    })

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose()
    })

    const commentaryPortal = new ComponentPortal(Commentary)
    const componentRef =overlayRef.attach(commentaryPortal)
    componentRef.instance.subtaskId= this.task.id
    componentRef.instance.subtask= this.task
  }

  addSubTask(){
    // console.log(this.task);
    this.openLoading()
    const title = this.subTaskForm.get('title')?.value
    const deadLine = this.subTaskForm.get('deadLine')?.value
    const parentId = this.task.id
    const taskId = this.task.taskId
    console.log(title+' '+deadLine)
    if(title && deadLine){
      this.dialogService.openLoading()
      console.log(title+' '+parentId+' '+deadLine)
      const newDeadLine = new Date(deadLine)
      this.liaisonBackS.addSubTask(title, parentId, taskId, newDeadLine).then(data => data.subscribe(
        element => {
          this.relaiToSource()     
        }
      ))
    }
  }

  finishSubTask(id:string){
    this.liaisonBackS.finishSubTask(id).then(data => data.subscribe(
      element => {
        this.relaiToSource()
      }
    ))
  }
  relaiToSource(){
    console.log('pont')
    this.maj.emit('next')
  }

  checkDeadline(){
    if (this.task) {
      const today = new Date()
      const d1 = new Date(this.task.deadLine)
      const diffTime = Math.abs(d1.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays<=7) {
        return { red:true }
      }
      else if ((8<=diffDays)&&(diffDays<=21)) {
        return { yellow: true }
      }
      else if (diffDays>21) {
        return { green:true }
      }
      else
          return { white:true }
    }
    else
      return ''
  }
  getClass(){
    if (this.task.done) {
      return { white:true }
    }
    else
      return this.checkDeadline()
  }
  testDisabled(){
    const title = this.subTaskForm.get('title')?.value
    const deadLine = this.subTaskForm.get('deadLine')?.value
    if (title&&deadLine) {
      return false
    }
    else
      return true
  }
  dropSubtask(){
    this.openLoading()
    this.liaisonBackS.dropSubtask(this.task.id).then(data => data.subscribe(
      element => {
        this.relaiToSource()
      }
    ))
  }
  openLoading(){
    this.dialogService.openLoading()
  }
  closeLoading(){
    if (this.overlayRef) {
      this.overlayRef.dispose()
      this.overlayRef = null 
    }
  }
}
