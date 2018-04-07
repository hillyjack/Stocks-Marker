import * as express from 'express';
import { SingleStock } from '../model/single-stock';
import * as bodyParser from 'body-Parser';
import {UserStocks} from '../model/user-stocks';
import {forEach} from '@angular/router/src/utils/collection';


export class App {
  StocksData: SingleStock[] = [];
  expressApp: any;
  io: any;
  // userAccount: UserStocks[] = [];
  usersAccountsArrById: any = {};
  // userAccountManager: any;


  constructor() {
    this.loadSingleStockData();
    this.expressApp = express();
    this.expressApp.use(express.static('website'));
    this.middleware();
    this.mountRoutes();

    this.expressApp.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    });
  }


  mountRoutes(): void {
    const router = express.Router();
    this.expressApp.use('/', router);
    /*getAllStocksData*/
    router.get('/stocks', (request, response) => {
      response.json({result: this.StocksData});
    });
    /*initUserAccount*/
    router.get('/initUserAccountIfNeeded/:userId', (request, response) => {
      let data;
      console.log(request.params);
      console.log('this.usersAccountsArrById ', this.usersAccountsArrById);
      data = request.params;
      this.initUserAccountIfNeeded(data.userId);
      console.log(this.usersAccountsArrById);
      response.json({result: 1});
    });
    /*buyStocks*/
    router.get('/stocks/buy/:userId/:stockMarketID/:stockAmount/:purchasePrice', (request, response) => {
      console.log('Lets buyyyyy ');
      let data: UserStocks;
      console.log('data ', request.params);
      data = request.params;
      console.log('data.userId ', data.userId);
      console.log('this.usersAccountsArrById ', this.usersAccountsArrById);
      console.log('this.usersAccountsArrById[data.userId] ', this.usersAccountsArrById[data.userId]);
      const userAccount = this.usersAccountsArrById[data.userId];
      console.log('userAccount ', userAccount);
      const buyUserStock = new UserStocks(data.userId, data.stockMarketID, data.stockAmount, data.purchasePrice);
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
    router.get('/stocks/sell/:user', (request, response) => {
      let data;
      data = request.params;
      response.send('some some some ' + data.user);
    });
  }

  private initUserAccountIfNeeded(userId) {
    console.log('this.usersAccountsArrById ');
    let userIdExist;
    for (const key in this.usersAccountsArrById) {
      console.log('in the for of this.usersAccountsArrById ', this.usersAccountsArrById);
      if (key === userId) {
        userIdExist = true;
        break;
      }
    }

    if (!userIdExist) {
      // this.usersAccountsArrById[userId] = {};
      this.usersAccountsArrById[userId] = [];
    }
  }


  private loadSingleStockData (): void {
    this.StocksData.push(new SingleStock(1, 'Teva', 11000, 12));
    this.StocksData.push(new SingleStock(2, 'Google', 21200, 15));
    this.StocksData.push(new SingleStock(3, 'Facebook', 12200, 25));
    this.StocksData.push(new SingleStock(4, 'RDV', 45000, 26));
    this.StocksData.push(new SingleStock(5, 'Drivenets', 99003, 24));
    setInterval(() => {
      this.changeStockCurrentPrice();
    }, 50000);
  }

  private changeStockCurrentPrice(): void {
    console.log('changeStockCurrentPrice');
    for (let i = 0; i < this.StocksData.length; i++) {

      console.log('in for ', i);
      const integer = this.generateRandomInteger((-100) + this.StocksData[i].change, 100 + this.StocksData[i].change);
      console.log('integer  ',integer);
      const startingPrice =  this.StocksData[i].StartingPrice;
      const prevCurrentPrice = this.StocksData[i].CurrentPrice;
      const currentPrice = this.StocksData[i].CurrentPrice + integer;
      //console.log('this.StocksData[i].changeDir ', this.StocksData[i].changeDir);
      //console.log('end', this.StocksData[i].CurrentPrice += integer);
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
