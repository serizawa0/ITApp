import { AfterViewInit, Component } from '@angular/core';
import { Task } from '../../../../interfaces/TaskInterfaces';
import { TaskTree } from '../task-tree/task-tree';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';
import { DefaultDeserializer } from 'v8';
import { DialogService } from '../../../services/Dialog/dialog-service';

@Component({
  selector: 'app-dashboard',
  imports: [
    TaskTree, ReactiveFormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements AfterViewInit{
  tasks:Task[]
  taskForm:FormGroup
  subTaskForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private liaison:LiaisonBack,
    private dialogService:DialogService
  ){
    this.taskForm = this.formBuilder.group({
      title:''
    })
    this.subTaskForm = this.formBuilder.group({
      title:'',
      deadLine:''
    })
    this.tasks = []
    this.getTask()
  }

  getTask(){
    this.liaison.getTask().then(data => data.subscribe(
      element => {
        this.tasks = element
        this.dialogService.closeLoading()
        console.log(this.tasks)
      }
    ))
  }

  addTask(){
    const title = this.taskForm.get('title')?.value
    if(title)
      this.liaison.addTask(title).then(data => data.subscribe(
        element => {
          this.taskForm.reset()
          this.getTask()
      }))
  }


  majInterne(){
    this.getTask()
  }

  addSubTask(task:Task){
    console.log(task)
    const taskid = task.id
    const title = this.subTaskForm.get('title')?.value
    const deadLine = this.subTaskForm.get('deadLine')?.value
    const parentId = undefined
    if (title && deadLine) {
      const newDeadLine = new Date(deadLine)
      this.liaison.addSubTask(title, parentId, taskid, newDeadLine).then(data => data.subscribe(element => {
        this.subTaskForm.reset()
        this.getTask()
      }))
    }
  }
  ngAfterViewInit(): void {
    this.getTask()
  }
  testButton(){
    const title = this.subTaskForm.get('title')?.value
    const deadLine = this.subTaskForm.get('deadLine')?.value
    if (title&&deadLine) {
      return true
    }
    else
      return false
  }
  testTask(){
    const title = this.taskForm.get('title')?.value
    if (title) {
      return false
    }
    else
      return true
  }
  openLoading(){

  }
} 
