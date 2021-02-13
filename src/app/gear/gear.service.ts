import { Injectable } from '@angular/core';
import { GearSlots } from '../character/gearslot';
import { Item } from '../item/item';


import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database.service';




@Injectable({
  providedIn: 'root'
})
export class GearService {


  gearOptions: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  constructor(private databaseService: DatabaseService) {
    this.initGearList();
  }

  async addGearForSlot(gear: Item, gearSlot: GearSlots) {
    const collection = await this.databaseService.gearCollection
    return collection.updateOne({ id: gear._id }, gear, { upsert: true });
  }

  private async initGearList() {
    try {
      await this.GetItemsFromDB();
      await this.watchDBForChanges();
    } catch (err) {
      console.error("Failed to log in", err);
      return err;
    }
  }

  private async GetItemsFromDB(): Promise<void> {
    const collection = await this.databaseService.gearCollection
    this.gearOptions.next(await collection.find());
  }

  private async watchDBForChanges() {
    const collection = await this.databaseService.gearCollection;
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
