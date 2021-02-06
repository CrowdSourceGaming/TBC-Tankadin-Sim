import { Component, OnInit } from '@angular/core';
import { GearSlots } from '../character/gearslot';

@Component({
  selector: 'app-gear-slot',
  templateUrl: './gear-slot.component.html',
  styleUrls: ['./gear-slot.component.scss']
})
export class GearSlotComponent implements OnInit {

  slots = Object.keys(GearSlots);
  gearSlots = GearSlots

  constructor() { }

  getGearType(slot: string){
    return GearSlots[slot as keyof typeof GearSlots];
  }

  ngOnInit(): void {
  }

}
