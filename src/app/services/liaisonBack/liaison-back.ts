import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../../../classes/User';
import Item from '../../../classes/Item';
import { Task } from '../../../interfaces/TaskInterfaces';
import { FileInterface } from '../../../interfaces/FileInterface';
import { CommentaryInterface } from '../../../interfaces/CommentaryInterface';
import { LinkService } from '../link-service';

@Injectable({
  providedIn: 'root'
})
export class LiaisonBack {
  // URL = 'http://localhost:3995/'
  URL = ''
  
  constructor(
    private http:HttpClient,
    private link:LinkService
  ){
    this.URL = this.link.URL
  }

  async getUsers(){
    return this.http.get<User[]>(this.URL+'getUsers')
  }

  async getItems(){
    return this.http.get<Item[]>(this.URL+'getitems')
  }

  async addItem(libele:string){
    const item = { libele:libele }
    console.log(item);
    
    return this.http.post<string>(this.URL+'addItem', item)
  }

  async getTask(){
    return this.http.get<Task[]>(this.URL+'getTask')
  }

  async addTask(title:string){
    const data = { title:title }
    return this.http.post<Task[]>(this.URL+'addTask', data)
  }

  async addSubTask(title:string, parentId:string|undefined,taskId:string, deadLine:Date){
    const data = { title:title, parentId:parentId, taskId:taskId, deadLine:deadLine }
    return this.http.post(this.URL+'addSubTask', data)
  }

  async finishSubTask(id:string){
    const data = { id:id }
    return this.http.post(this.URL+'finishSubTask', data)
  }

  async dropSubtask(id:string){
    const data = { id:id }
    return this.http.post(this.URL+'dropSubtask', data)
  }

  async dropTask(id:string) {
    const data = { id:id }
    return this.http.post(this.URL+'dropTask', data)
  }

  async uploadFiles(formData:FormData){
    return this.http.post(this.URL+'uploadFiles', formData)
  }

  async getFiles(subtaskId:string){
    const data = { subtaskId:subtaskId }
    return this.http.post<FileInterface[]>(this.URL+'getFiles', data)
  }

  async getCommentaries(subtaskId:string){
    const data = { subtaskId:subtaskId }
    return this.http.post<CommentaryInterface[]>(this.URL+'getCommentary', data)
  }

  async subCommentary(subtaskId:string, content:string,author:string){
    const data = { subtaskId:subtaskId, content: content, author:author }
    return this.http.post<CommentaryInterface[]>(this.URL+'subCommentary', data)
  }
}
