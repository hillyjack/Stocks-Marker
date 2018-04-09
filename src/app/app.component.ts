import {Component, OnInit} from '@angular/core';
import {SingleStock} from '../../model/single-stock';
import {UserStocks} from '../../model/user-stocks';

import {WebSocketService} from '../services/web-socket.service';
import {UserAccountComponent} from './user-account/user-account.component';
import {MatDialog} from '@angular/material';
import {HttpReqService} from '../services/http-req.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  StocksData: SingleStock[] = [];
  updateUserStocks: UserStocks[] = [];
  userId = 111;

  constructor(private httpService: HttpReqService, private ioService: WebSocketService, public dialog: MatDialog) {

  }

  ngOnInit() {
    console.log('ng on init ');
    this.httpService.dataFromBackend().subscribe((data) => {
      console.log('dataFromBackend ');
      this.StocksData = data.result;
    });
    this.ioService.getSocketsPrice()
      .subscribe((data) => {
      console.log('getSocketsPrice ');
      this.StocksData = data.result;
    });
  }
  trackByFn(item) {
    return item.stockMarketID || null;
  }
  openUserAccDialog(): void {
    let userStocks;
    this.httpService.getUserStocks(this.userId).subscribe((data) => {
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
      const sellEmit = dialogRef.componentInstance.onSellClick.subscribe((sellEmitData) => {
        console.log('sellEmit data ', sellEmitData);
        this.httpService.sellClick(sellEmitData).subscribe((sellClickData) => {

          console.log('this.updateUserStocks', sellClickData.result);
          dialogRef.componentInstance.userStocks = sellClickData.result;

        });
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }

  createUserAcc(): void {
    this.httpService.createUserAccIfNeeded(this.userId).subscribe((data) => {
      console.log('createUserAccIfNeeded ');
      const res = data.result;
      console.log(res);
    });
  }
  buyButtonClick(event): void {
    console.log('buyClick ', event);
    this.httpService.buyClickPost(event).subscribe((data) => {
      const res = data.result;
      console.log(res);
    });
  }

}

