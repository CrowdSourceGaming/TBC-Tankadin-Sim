import { Injectable } from '@angular/core';
import { GearSlots } from '../character/gearslot';
import { GemSocketColor, Item } from '../item/item';


import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database.service';
import { ItemStatsEnum } from '../item/item-stats';
import { Gem } from '../item/gem';
import { deserialize } from 'typescript-json-serializer';
import { SharedDataService } from '../shared/shared-data.service';




@Injectable({
  providedIn: 'root'
})
export class GearService {


  gearOptions: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  constructor(private databaseService: DatabaseService, private sharedDataService: SharedDataService) {
    this.initGearList();
  }

  async addGearForSlot(gear: Item, gearSlot: GearSlots) {
    const collection = await this.databaseService.gearCollection
    return collection.updateOne({ id: gear._id }, gear, { upsert: true });
  }

  applyGemsToGear(gemLogic: GemAlterationInterface) {
    const gearOptions = this.gearOptions.value
    gearOptions.forEach((item: Item) => {
      item.gemSockets.forEach(socket => {
        gemLogic.logic.forEach(logicalInsertion => {
          if (logicalInsertion.gem && logicalInsertion.setBonusAttribute && logicalInsertion.socketColor) {
            if (item.gemSocketBonus[logicalInsertion.setBonusAttribute as keyof typeof ItemStatsEnum] && socket.color === logicalInsertion.socketColor) {
              socket.gem = logicalInsertion.gem
            } else if (socket.color === GemSocketColor.meta) {
              socket.gem = gemLogic.defaultMeta
            } else {
              socket.gem = gemLogic.default
            }
          } else if (socket.color === GemSocketColor.meta) {
            socket.gem = gemLogic.defaultMeta
          } else {
            socket.gem = gemLogic.default
          }
        });
      });
    });
    this.gearOptions.next(gearOptions);
    this.sharedDataService.gemLogic = gemLogic;
  }



  /* PRIVATE */



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
    const items: Item[] = [];
    const collection = await this.databaseService.gearCollection
    const dbJSONItems = await collection.find();
    dbJSONItems.forEach(jsonItem => {
      items.push(deserialize(jsonItem, Item));
    });
    this.gearOptions.next(items);
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

export interface GemInsertionLogic {
  setBonusAttribute: ItemStatsEnum | null,
  socketColor: GemSocketColor | null,
  gem: Gem | null
}

export interface GemAlterationInterface {
  default: Gem | null,
  defaultMeta: Gem | null,
  logic: GemInsertionLogic[]
}

