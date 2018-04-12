import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SingleStock} from '../../../model/single-stock';
import {UserStocks} from '../../../model/user-stocks';

@Component({
  selector: 'app-user-stock',
  templateUrl: './user-stock.component.html',
  styleUrls: ['./user-stock.component.css']
})
export class UserStockComponent implements OnInit {
  @Input() data: UserStocks;
  @Input() StocksData: SingleStock[];
  @Output() sellStock: EventEmitter<any> = new EventEmitter<any>();
  CurrentStockData: SingleStock;
  constructor() {
  }

  ngOnInit() {
    console.log('UserStockComponent ', this.data);
    console.log('this.StocksData ', this.StocksData);
    for (let i = 0; i < this.StocksData.length; i++) {
      if (this.StocksData[i].stockMarketID === Number(this.data.stockMarketID)) {
        this.CurrentStockData = this.StocksData[i];
        console.log(this.CurrentStockData);
        break;
      }
    }
  }

  onSellButton(): void {
    const sellData = Object.assign({StockData : this.CurrentStockData, UserStocks: this.data});
    this.sellStock.emit(sellData);
  }

}
