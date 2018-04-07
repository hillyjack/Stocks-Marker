export class SingleStock {
  stockMarketID: number;
  stockMarketIndex: string;
  StartingPrice: number;
  CurrentPrice: number;
  dailyChange: number;
  change: number;
  changeDir: boolean;

  constructor(stockMarketID, stockMarketIndex, StartingPrice, change) {
    this.stockMarketID = stockMarketID;
    this.stockMarketIndex = stockMarketIndex;
    this.StartingPrice = StartingPrice;
    this.CurrentPrice = StartingPrice + 20 + change;
    this.dailyChange = change;
    this.change = change;
    this.changeDir = true;
  }
}

