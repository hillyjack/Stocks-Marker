import * as express from 'express';
import { SingleStock } from '../model/single-stock';
import * as bodyParser from 'body-Parser';
import * as socketIo from 'socket.io';


export class App {
  StocksData: SingleStock[] = [];
  expressApp: any;
  io: any;


  constructor() {
    this.loadSingleStockData();
    this.expressApp = express();
    this.expressApp.use(express.static('website'));
    this.middleware();
    this.mountRoutes();
    this.io = socketIo.listen(require('http').Server(this.expressApp));


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

  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended : false }));
  }


  mountRoutes (): void {
    const router = express.Router();
    this.expressApp.use('/', router);
    /*getAllStocksData*/
    router.get('/stocks', (request, response) => {
      response.json({result: this.StocksData});
    });
    /*sendUserStocksData*/
    router.get('/stocks/:user', (request, response) => {
      let data;
      data = request.params;
      response.send('some some some ' + data.user);
    });
    /*buyStocks*/
    router.get('/stocks/buy/:user', (request, response) => {
      let data;
      data = request.params;
      response.send('some some some ' + data.user);
    });
    /*sellStocks*/
    router.get('/stocks/sell/:user', (request, response) => {
      let data;
      data = request.params;
      response.send('some some some ' + data.user);
    });
  }
  loadSingleStockData (): void {
    this.StocksData.push(new SingleStock('Teva', 1000, 12));
    this.StocksData.push(new SingleStock('Google', 1200, 15));
    this.StocksData.push(new SingleStock('Facebook', 12200, 25));
    this.StocksData.push(new SingleStock('RDV', 45000, 26));
    this.StocksData.push(new SingleStock('Drivenets', 28003000, 24));
   this.startPublisher();
  }
  changeStockCurrentPrice(): void {
    console.log('changeStockCurrentPrice');
    for (let i = 0; i < this.StocksData.length; i++) {
      console.log('in for ', i);
      const integer = this.generateRandomInteger((-1) * this.StocksData[i].change, this.StocksData[i].change);
      this.StocksData[i].CurrentPrice += integer ;
      (integer + 50) < 0 ? this.StocksData[i].changeDir = false : this.StocksData[i].changeDir = true ;
      console.log('this.StocksData[i].changeDir ', this.StocksData[i].changeDir);
      console.log('end', this.StocksData[i].CurrentPrice += integer);
      this.StocksData[i].change = ((this.StocksData[i].CurrentPrice - this.StocksData[i].StartingPrice) / this.StocksData[i].StartingPrice) * 100;
    }

    console.log('emitted');
  }
  startPublisher(){
    setInterval(() => {
      this.io.emit('priceUpdated', {result: this.StocksData});
    },5000);
  }



  generateRandomInteger(min, max): number {
    const randNum = Math.floor(min + Math.random() * (max + 1 - min))
    return randNum === 0 ? 2 : randNum;
  }
}
export default new App();
