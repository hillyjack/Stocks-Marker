import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {SingleStock} from '../../model/single-stock';

import {WebSocketService} from '../services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  StocksData: SingleStock[] = [];

  constructor(private http: HttpClient, private ioService: WebSocketService) {
  }

  ngOnInit() {
    console.log('ng on init ');
    this.dataFromBackend().subscribe((data) => {
      console.log('dataFromBackend ');
      this.StocksData = data.result;
    });
    this.ioService.getSocketsPrice()
      .subscribe((data) => {
      console.log('getSocketsPrice ');
      this.StocksData = data.result;
    });
  }

  dataFromBackend(): Observable<any> {
    return this.http.get<SingleStock[]>('/stocks');
  }
}

