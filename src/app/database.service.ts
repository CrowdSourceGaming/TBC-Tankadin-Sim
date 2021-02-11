import { Injectable } from '@angular/core';

import * as Realm from "realm-web";
import { BehaviorSubject } from 'rxjs';
import { Gem } from './item/gem';
import { Item } from './item/item';

const DBName = 'tbc-gear';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  realmApp!: Realm.App;
  mongoDB!: globalThis.Realm.Services.MongoDB
  user!: Realm.User;

  isConnected: boolean = false;

  constructor() {
    this.init();
  }

  async init() {
    this.realmApp = new Realm.App({ id: "tankadin_sim_tbc-gyyrn" });
    const credentials = Realm.Credentials.anonymous();
    const user: Realm.User = await this.realmApp.logIn(credentials);
    this.mongoDB = user.mongoClient(
      "mongodb-atlas"
    );
    this.isConnected = true;
  }

  get gearCollection(): Promise<globalThis.Realm.Services.MongoDB.MongoDBCollection<Item>> {
    return new Promise(async (resolve) => {
      await this.waitForConnection()
      return resolve(this.mongoDB.db(DBName).collection<Item>('gear'));
    })
  }

  get gemCollection(): Promise<globalThis.Realm.Services.MongoDB.MongoDBCollection<Gem>> {
    return new Promise(async (resolve) => {
      await this.waitForConnection()
      return resolve(this.mongoDB.db(DBName).collection<Gem>('gems'));
    })

  }

  private async waitForConnection() {
    while (!this.isConnected) {
      await this.sleep(100);
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
