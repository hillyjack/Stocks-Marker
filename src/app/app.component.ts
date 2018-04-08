import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {SingleStock} from '../../model/single-stock';

import {WebSocketService} from '../services/web-socket.service';
import {BuyDialogComponent} from './buy-dialog/buy-dialog.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {MatDialog} from '@angular/material';
import {UserStocks} from '../../model/user-stocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  StocksData: SingleStock[] = [];
  userId = 111;

  constructor(private http: HttpClient, private ioService: WebSocketService, public dialog: MatDialog) {
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
  openUserAccDialog(): void {
    let userStocks;
    this.getUserStocks().subscribe((data) => {
      console.log('getUserStocks ');
      userStocks = data.result;
      console.log('userStocks ', userStocks);
      if (!userStocks) {
        userStocks = 0;
      }
      const dialogRef = this.dialog.open(UserAccountComponent, {
        width: '100vw',
        height: '80vh',
        data: {userStocks: userStocks, StocksData: this.StocksData }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }

  getUserStocks(): Observable<any> {
    return this.http.get<any>('/getUserStocks/' + this.userId);
  }

  dataFromBackend(): Observable<any> {
    return this.http.get<SingleStock[]>('/stocks');
  }
}

