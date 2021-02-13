import { Injectable } from '@angular/core';
import { Gem, GemColor } from './gem';

import * as Realm from "realm-web";
import { DatabaseService } from '../database.service';
import { GearSlotComponent } from '../gear-slot/gear-slot.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GemService {

  gems: BehaviorSubject<Gem[]> = new BehaviorSubject<Gem[]>([]);


  constructor(private databaseService: DatabaseService) {
    this.getGems();
  }

  async getGems(): Promise<void> {
    const collection = await this.databaseService.gemCollection
    const gems = await collection.find();
    this.gems.next(gems);
  }

  async putGem(gem: Gem) {
    const collection = await this.databaseService.gemCollection
    await collection.updateOne({ id: gem.name }, gem, { upsert: true })
  }
}

export enum Gems {

}
