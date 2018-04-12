import {Component, OnInit} from '@angular/core';
import {SingleStock} from '../../model/single-stock';
import {UserStocks} from '../../model/user-stocks';


import {UserAccountComponent} from './user-account/user-account.component';
import {MatDialog} from '@angular/material';
import {StockService} from '../services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  StocksData: SingleStock[] = [];
  updateUserStocks: UserStocks[] = [];
  userId = 111;

  constructor(private StockDataService: StockService, public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log('ng on init ');
    this.StockDataService.getAllStocks()
      .subscribe((data) => {
        console.log('getAllStocks - dataFromBackend ');
        this.StocksData = data.result;
    });

    this.StockDataService.updateStocksPrices()
      .subscribe((data) => {
        console.log('updateStocksPrices - getSocketsPrice ');
        this.StocksData = data.result;
    });
  }

  trackByFn(item) {
    return item.stockMarketID || null;
  }

  openUserAccDialog(): void {
    let userStocks;
    this.StockDataService.getStocksByUser(this.userId)
      .subscribe((data) => {
        console.log('getStocksByUser - getUserStocks ');
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
          this.StockDataService.sellStocks(sellEmitData)
            .subscribe((sellClickData) => {
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
    this.StockDataService.createUserAccount(this.userId)
      .subscribe((data) => {
        console.log('createUserAccount - createUserAccIfNeeded ');
        const res = data.result;
        console.log(res);
    });
  }
  buyButtonClick(event): void {
    console.log('buyClick ', event);
    this.StockDataService.buyStocks(event)
      .subscribe((data) => {
        const res = data.result;
        console.log(res);
    });
  }

}

