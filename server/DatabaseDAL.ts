import * as SeqObj from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {promise} from 'selenium-webdriver';

export class DatabaseDAL {
  sequelize: Sequelize;
  stock;
  user;
  userStock;

  constructor() {}

  async initConnection(dbName: string = 'postgres', user: string = 'postgres', password: string = 'mysecretpassword'): Promise<any> {
    this.sequelize =  await new SeqObj(dbName, user, password, {
      host: 'localhost',
      dialect: 'postgres'
    });
    console.log('finish initConnection');
    await this.init();
    console.log('finish init');
  }

  private async init() {
    await this.seqAuthenticate();
    await this.seqDefineModel();
    await this.syncDb();
  }

  public createStock(stockID, stockName, startingPrice): void {
    this.stock.findOrCreate({where: {stockID, stockName, startingPrice}})
      .spread((user, created) => {
        console.log(user.get({
          plain: true
        }));
        console.log(created);
      });
    //   return this.stock.create({
    //     stockID,
    //     stockName,
    //     startingPrice
    // });
  }

  public async getStocks(): Promise<any> {
    const res = await this.stock.findAll({
      attributes: ['stockID', 'stockName', 'startingPrice']
    });
    return res;
  }

  // public createUser(userID, userName, userPassword): Promise<User> {
  //   return this.user.create({
  //     userID,
  //     userName,
  //     userPassword
  //   });
  // }

  public createUserStock(userID, stockID, amountOfStocks, stockPurchasedPrice): Promise<UserStock> {
    return this.userStock.create({
      userID,
      stockID,
      amountOfStocks,
      stockPurchasedPrice
    });
  }

  public async getUserStocksById(userId): Promise<any> {
    const res = await this.userStock.findAll({
      attributes: ['userID', 'stockID', 'stockPurchasedPrice', 'amountOfStocks'],
      where: {
        userID: userId
      }
    });
    return res;
  }

  seqAuthenticate(): void {
    this.sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }

  async seqDefineModel(): Promise<any> {
    this.stock = await this.sequelize.define('stock', {
      stockID: {
        type: SeqObj.INTEGER,
        unique: true,
        primaryKey: true
      },
      stockName: {type: SeqObj.STRING},
      startingPrice: {type: SeqObj.INTEGER}
    });

    // this.user = this.sequelize.define('user', {
    //   userID: {type: SeqObj.INTEGER},
    //   userName: {type: SeqObj.STRING},
    //   userPassword: {type: SeqObj.INTEGER}
    // });

    this.userStock = this.sequelize.define('userStock', {
      stockID: {type: SeqObj.INTEGER},
      userID: {type: SeqObj.INTEGER},
      amountOfStocks: {type: SeqObj.INTEGER},
      stockPurchasedPrice: {type: SeqObj.BIGINT}
    });
    console.log('finish seqDefineModel');
  }

  private async syncDb() {
    await this.stock.sync();
    // await this.user.sync();
    await this.userStock.sync();

    this.userStock.hasMany(this.stock, {foreignKey: 'stockID'});
    this.stock.belongsTo(this.userStock, {foreignKey: 'stockID'});
    console.log('finish syncDb');
  }
}
export default new DatabaseDAL();


export interface Stock {
  stockID: number;
  stockName: string;
  startingPrice: number;
}

// export interface User {
//   userID: number;
//   userName: string;
//   userPassword: number;
// }
//
export interface UserStock {
  userID: number;
  stockID: number;
  amountOfStocks: number;
  stockPurchasedPrice: number;
}
