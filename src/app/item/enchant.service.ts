import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database.service';
import { Enchant } from './enchant';

@Injectable({
  providedIn: 'root'
})
export class EnchantService {

  enchants: BehaviorSubject<Enchant[]> = new BehaviorSubject<Enchant[]>([]);

  constructor(private databaseService: DatabaseService) {
    this.init();
  }

  async init(){
    const collection = await this.databaseService.enchantCollection
    this.enchants.next(await collection.find());
    this.watchDBForChanges()
  }


  private async watchDBForChanges() {
    const collection = await this.databaseService.enchantCollection;
    for await (const change of collection.watch()) {
      const currentGearOptions = this.enchants.value;
      const { operationType } = change;

      switch (operationType) {
        case "insert": {
          const { documentKey, fullDocument, } = change as globalThis.Realm.Services.MongoDB.InsertEvent<Enchant>;
          currentGearOptions.push(fullDocument);
          break;
        }
        case "replace": {
          const { documentKey, fullDocument, } = change as globalThis.Realm.Services.MongoDB.ReplaceEvent<Enchant>;
          const index = currentGearOptions.findIndex((gear) => gear.id === fullDocument._id);
          currentGearOptions[index] = fullDocument;
          break;
        }
        case "delete": {
          const { documentKey } = change as globalThis.Realm.Services.MongoDB.DeleteEvent<Enchant>;
          const index = currentGearOptions.findIndex((gear) => gear.id === documentKey._id);
          currentGearOptions.splice(index, 1);
          break;
        }
      }
      this.enchants.next(currentGearOptions);
    }
  }

}
