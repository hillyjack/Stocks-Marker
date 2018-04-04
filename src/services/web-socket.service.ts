import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebSocketService {
  private socket;
  constructor() { }

  getSocketsPrice(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket = io('http://localhost:3000');
      this.socket.on('priceUpdated',
        (data) => {
        console.log('recieved socket.io data');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
