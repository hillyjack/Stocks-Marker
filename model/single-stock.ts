export class SingleStock {
  stockMarketIndex: string;
  StartingPrice: number;
  CurrentPrice: number;
  change: number;
  changeDir: boolean;

  constructor(stockMarketIndex, StartingPrice, change) {
    this.stockMarketIndex = stockMarketIndex;
    this.StartingPrice = StartingPrice;
    this.CurrentPrice = StartingPrice + 20 + change;
    this.change = change;
    this.changeDir = true;
  }
}


