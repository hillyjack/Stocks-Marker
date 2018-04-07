
export class UserStocks {
  userId: number;
  stockMarketID: number;
  stockAmount: number;
  purchasePrice: number;

  constructor(userId, stockMarketID, stockAmount, purchasePrice) {
    this.userId = userId;
    this.stockMarketID = stockMarketID;
    this.stockAmount = stockAmount;
    this.purchasePrice = purchasePrice;
  }
}

