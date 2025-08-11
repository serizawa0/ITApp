import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Task } from '../../../interfaces/TaskInterfaces';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | undefined;
  constructor(){
    console.log('service called')
  }

  connect() {
    console.log('test')
    if (typeof window === 'undefined') return;
    if (this.socket) {
      return
    }
    if (!this.socket) {
      this.socket = io('http://192.168.1.175:3995', {
        transports: ['websocket'],
        reconnectionAttempts: 3,   // évite les boucles infinies
        timeout: 5000  
      });
    }
  }

  onRefreshTasks():Observable<Task[]>{
    return new Observable(observer => {
      this.socket?.on('refreshTasks', (text) => {
        console.log(text)
        observer.next(text)
      })
    })
  }
  launchRefresh(){
    this.socket?.emit('launchRefresh')
  }
}
