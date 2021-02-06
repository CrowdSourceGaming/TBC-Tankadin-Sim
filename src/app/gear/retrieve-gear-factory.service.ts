import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { GearSlots } from '../character/gearslot';
import { Item } from '../character/item';
import { head } from './head'

@Injectable({
  providedIn: 'root'
})
export class RetrieveGearFactoryService {

  constructor() { }

  getGearForSlot(gearSlot: GearSlots): Item[] {
    console.log('gearSlot', gearSlot);
    switch (gearSlot) {
      case GearSlots.head: {
        return head;
      }
      default: {
        return [];
      }
    }

  }
}
