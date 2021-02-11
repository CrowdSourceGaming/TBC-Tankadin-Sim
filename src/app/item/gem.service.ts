import { Injectable } from '@angular/core';
import { Gem, GemColor } from './gem';

import * as Realm from "realm-web";
import { DatabaseService } from '../database.service';
import { GearSlotComponent } from '../gear-slot/gear-slot.component';

@Injectable({
  providedIn: 'root'
})
export class GemService {


  constructor(private databaseService: DatabaseService) { }

  getGem() { }

  async putGem(gem: Gem) {
    const collection = await this.databaseService.gemCollection
    await collection.updateOne({ id: gem.name }, gem, { upsert: true })
  }
}

export enum Gems {

}
