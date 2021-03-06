import * as express from 'express';
import { SingleStock } from '../model/single-stock';
import * as bodyParser from 'body-Parser';
import {UserStocks} from '../model/user-stocks';
import index from '@angular/cli/lib/cli';


export class App {
  StocksData: SingleStock[] = [];
  expressApp: any;
  io: any;
  usersAccountsArrById: any = {};// Map


  constructor() {
    this.loadSingleStockData();
    this.expressApp = express();
    this.expressApp.use(express.static('website'));
    this.middleware();
    this.mountRoutes();
  }


  mountRoutes(): void {
    const router = express.Router();
    this.expressApp.use('/', router);
    /*getAllStocksData*/
    router.get('/stocks', (request, response) => {
      response.json({result: this.StocksData});
    });

    /*buyStocksPost*/
    router.post('/stocks/buyPost', (request, response) => {
      const data: UserStocks = request.body.UserStocks;
      console.log('/stocks/buyPost data ', data);
      console.log('data.userId ', data.userId);
      console.log('this.usersAccountsArrById ', this.usersAccountsArrById);
      console.log('this.usersAccountsArrById[data.userId] ', this.usersAccountsArrById[data.userId]);
      this.initUserAccountIfNeeded(data.userId);
      const userAccount = this.usersAccountsArrById[data.userId];
      console.log('userAccount ', userAccount);
      const buyUserStock = new UserStocks(data.userId, data.stockMarketID, data.stockAmount, data.purchasePrice);
      console.log('buyUserStock ', buyUserStock);
      console.log('buyUserStock ', data);
      userAccount.push(buyUserStock);
      response.json({result: 1});
      console.log(this.usersAccountsArrById);
    });

    /*getUserStocks*/
    router.get('/getUserStocks/:userId', (request, response) => {
      let data;
      data = request.params;
      try {
      const userAccount = this.usersAccountsArrById[data.userId];
        response.json({result: userAccount});
        console.log(userAccount);
      } catch {
        response.json({result: 0});
      }
    });

    /*sellStocks*/
    router.post('/stocks/sell', (request, response) => {
      const data = request.body;
      console.log('stocks/sell data ', data);
      console.log('sellStocks, stockMarketID ', data.UserStocks.stockMarketID, data.UserStocks.stockAmount, data.UserStocks.userId);
      const userAccount = this.usersAccountsArrById[data.UserStocks.userId];
      console.log('userAccount ', userAccount);
      userAccount.forEach((stock, index) => {
        if (stock.stockMarketID === data.UserStocks.stockMarketID && stock.purchasePrice === data.UserStocks.purchasePrice && stock.stockAmount === data.UserStocks.stockAmount) {
          userAccount.splice(index, 1);
        }
       });
      console.log('userAccount ', userAccount);
      response.json({result: userAccount});
    });
  }

  private initUserAccountIfNeeded(userId) {
    console.log('this.usersAccountsArrById ');
    this.usersAccountsArrById[userId] = this.usersAccountsArrById[userId] ?  this.usersAccountsArrById[userId] : [];
    console.log(this.usersAccountsArrById);
  }

  private loadSingleStockData (): void {
    this.StocksData.push(new SingleStock(1, 'Teva', 11000, 12));
    this.StocksData.push(new SingleStock(2, 'Google', 21200, 15));
    this.StocksData.push(new SingleStock(3, 'Facebook', 12200, 25));
    this.StocksData.push(new SingleStock(4, 'RDV', 45000, 26));
    this.StocksData.push(new SingleStock(5, 'Drivenets', 99003, 24));
    setInterval(() => {
      this.changeStockCurrentPrice();
    }, 10000);
  }

  private changeStockCurrentPrice(): void {
    console.log('changeStockCurrentPrice');
    for (let i = 0; i < this.StocksData.length; i++) {

      console.log('in for ', i);
      const integer = this.generateRandomInteger((-100) + this.StocksData[i].change, 100 + this.StocksData[i].change);
      console.log('integer  ', integer);
      const startingPrice =  this.StocksData[i].StartingPrice;
      const prevCurrentPrice = this.StocksData[i].CurrentPrice;
      this.StocksData[i].CurrentPrice += integer;
      const currentPrice = this.StocksData[i].CurrentPrice;
      this.StocksData[i].dailyChange = ((currentPrice - startingPrice) / startingPrice) * 100;
      this.StocksData[i].change = ((currentPrice - prevCurrentPrice) / prevCurrentPrice) * 100;
      this.StocksData[i].dailyChange  < 0 ? this.StocksData[i].changeDir = false : this.StocksData[i].changeDir = true;

    }
    this.io.emit('priceUpdated', {result: this.StocksData});
    console.log('emitted');
  }

  private generateRandomInteger(min, max): number {
    const randNum = Math.floor(min + Math.random() * (max + 1 - min))
    return randNum === 0 ? 2 : randNum;
  }

  public init(io: any) {
    this.io = io;
  }

  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended : false }));
  }

  /*manageUserAccount (userId): any {
    const userID = userId;
    let userStocksAccount = [];
    return {
      buyStock: (UserStocks) => {
        userStocksAccount.push(UserStocks);
        console.log(userID + ' ' + userStocksAccount);
      },
      sellStock: (SingleStock) => {
        console.log(userID + ' ' + userStocksAccount);
      }
    };
  }*/
}
export default new App();
