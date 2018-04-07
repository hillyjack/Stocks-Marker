import {Component, Input, OnInit} from '@angular/core';
import {SingleStock} from '../../../model/single-stock';
import {UserStocks} from '../../../model/user-stocks';

@Component({
  selector: 'app-user-stock',
  templateUrl: './user-stock.component.html',
  styleUrls: ['./user-stock.component.css']
})
export class UserStockComponent implements OnInit {
  @Input()
  data: UserStocks;
  @Input()
  StocksData: SingleStock[];
  CurrentStockData: SingleStock;
  constructor() {
    console.log('UserStockComponent ', this.data);
    console.log(this.StocksData);
  }

  ngOnInit() {
    for (let i = 0; i < this.StocksData.length; i++) {
      if (this.StocksData[i].stockMarketID === this.data.stockMarketID) {
        this.CurrentStockData = this.StocksData[i];
        console.log(this.CurrentStockData);
      }
    }
  }

}
