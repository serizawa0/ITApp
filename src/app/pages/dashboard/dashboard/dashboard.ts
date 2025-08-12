import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Task } from '../../../../interfaces/TaskInterfaces';
import { TaskTree } from '../task-tree/task-tree';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';
import { DefaultDeserializer } from 'v8';
import { DialogService } from '../../../services/Dialog/dialog-service';
import { SocketService } from '../../../services/Socket/socket-service';
import { IconComponent } from '../../../icon/icon-component/icon-component';

@Component({
  selector: 'app-dashboard',
  imports: [
    TaskTree, ReactiveFormsModule, IconComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements AfterViewInit, OnInit{
  tasks:Task[]
  taskForm:FormGroup
  subTaskForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private liaison:LiaisonBack,
    private dialogService:DialogService,
    private socketService:SocketService
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
  ngOnInit(): void {
    this.socketService.connect()
    this.socketService.onRefreshTasks().subscribe(
      (element) => {
        this.dialogService.closeLoading()
        this.tasks = element
      }
    )
  }

  getTask(){
    this.liaison.getTask().then(data => data.subscribe(
      element => {
        this.tasks = element
        console.log(element)
        // this.dialogService.closeLoading()
      }
    ))
  }

  addTask(){
    this.openLoading()
    const title = this.taskForm.get('title')?.value
    if(title)
      this.liaison.addTask(title).then(data => data.subscribe(
        element => {
          this.openLoading()
          this.taskForm.reset()
          setTimeout(() => {
            this.socketService.launchRefresh()
          }, 1000)  
      }))
  }


  majInterne(){
    this.openLoading()
    setTimeout(() => {
      this.socketService.launchRefresh()
    }, 1000)  
    // this.getTask()
  }

  addSubTask(task:Task){
    console.log(task)
    const taskid = task.id
    const title = this.subTaskForm.get('title')?.value
    const deadLine = this.subTaskForm.get('deadLine')?.value
    const parentId = undefined
    if (title && deadLine) {
      this.dialogService.openLoading()
      const newDeadLine = new Date(deadLine)
      this.liaison.addSubTask(title, parentId, taskid, newDeadLine).then(data => data.subscribe(element => {
        this.subTaskForm.reset()
        this.openLoading()
        setTimeout(() => {
          this.socketService.launchRefresh()
        }, 1000)  
      }))
    }
  }
  ngAfterViewInit(): void {
    // this.getTask()
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
    this.dialogService.openLoading()
  } 
  dropTask(id:string){
    // this.dialogService.openLoading()
    this.liaison.dropTask(id).then( data => data.subscribe(
      element => {
        this.openLoading()
        setTimeout(() => {
          this.socketService.launchRefresh()
        }, 1000)  
      }
    ))
  }
} 
