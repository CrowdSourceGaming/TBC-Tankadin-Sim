import { Injectable } from '@angular/core';
import { GearSlots } from '../character/gearslot';
import { Item } from '../character/item';
import { head } from './head'

import * as Realm from "realm-web";
import { ItemType } from '../character/item-stats';
import { BehaviorSubject } from 'rxjs';

const DBName = 'tbc-gear';
const collectionName = 'gear';

@Injectable({
  providedIn: 'root'
})
export class GearService {
  realmApp!: Realm.App;
  mongoDB!: globalThis.Realm.Services.MongoDB
  user!: Realm.User;

  gearOptions: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  constructor() {
    this.initGearList();
  }

  async addGearForSlot(gear: Item, gearSlot: GearSlots) {
    const collection = this.mongoDB.db(DBName).collection(collectionName);
    return await collection.updateOne({ id: gear._id }, gear, { upsert: true });
  }

  private async initGearList() {
    this.realmApp = new Realm.App({ id: "tankadin_sim_tbc-gyyrn" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user: Realm.User = await this.realmApp.logIn(credentials);
      this.mongoDB = user.mongoClient(
        "mongodb-atlas"
      );
      await this.GetItemsFromDB();
      await this.watchDBForChanges();
    } catch (err) {
      console.error("Failed to log in", err);
      return err;
    }
  }

  private async GetItemsFromDB(): Promise<void> {
    console.log('calling database');
    const collection: globalThis.Realm.Services.MongoDB.MongoDBCollection<Item> = this.mongoDB.db(DBName).collection(collectionName);
    this.gearOptions.next(await collection.find());
  }

  private async watchDBForChanges() {
    const collection = this.mongoDB.db(DBName).collection(collectionName);
    for await (const change of collection.watch()) {
      const currentGearOptions = this.gearOptions.value;
      const { operationType } = change;

      switch (operationType) {
        case "insert": {
          const { documentKey, fullDocument, } = change as globalThis.Realm.Services.MongoDB.InsertEvent<Item>;
          currentGearOptions.push(fullDocument);
          break;
        }
        case "replace": {
          const { documentKey, fullDocument, } = change as globalThis.Realm.Services.MongoDB.ReplaceEvent<Item>;
          const index = currentGearOptions.findIndex((gear) => gear.id === fullDocument._id);
          currentGearOptions[index] = fullDocument;
          break;
        }
        case "delete": {
          const { documentKey } = change as globalThis.Realm.Services.MongoDB.DeleteEvent<Item>;
          const index = currentGearOptions.findIndex((gear) => gear.id === documentKey._id);
          currentGearOptions.splice(index, 1);
          break;
        }
      }
      this.gearOptions.next(currentGearOptions);
    }
  }
}
