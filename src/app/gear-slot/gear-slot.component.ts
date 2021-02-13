import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { GearSlots } from '../character/gearslot';

const tabs = {
  [GearSlots.head]: 0,
  [GearSlots.neck]: 1,
  [GearSlots.shoulder]: 2,
  [GearSlots.back]: 3,
  [GearSlots.chest]: 4,
  [GearSlots.wrist]: 5,
  [GearSlots.hands]: 6,
  [GearSlots.waist]: 7,
  [GearSlots.legs]: 8,
  [GearSlots.feet]: 9,
  [GearSlots.fingerOne]: 10,
  [GearSlots.fingerTwo]: 11,
  [GearSlots.trinketOne]: 12,
  [GearSlots.trinketTwo]: 13,
  [GearSlots.mainHand]: 14,
  [GearSlots.offHand]: 15,
  [GearSlots.relic]: 16
}

@Component({
  selector: 'app-gear-slot',
  templateUrl: './gear-slot.component.html',
  styleUrls: ['./gear-slot.component.scss']
})
export class GearSlotComponent implements AfterViewInit {

  @ViewChild('tabsGroup')
  tabGroup!: MatTabGroup;

  slots = Object.keys(GearSlots);
  gearSlots = GearSlots

  activeTabIndex = 0;

  constructor(private router: ActivatedRoute) { }

  ngAfterViewInit(): void {
    const slot: GearSlots = this.router.snapshot.params.slot
    this.tabGroup.selectedIndex = tabs[GearSlots[slot as keyof typeof GearSlots]];
  }

  getGearType(slot: string) {
    return GearSlots[slot as keyof typeof GearSlots];
  }

  tabChanged(event: any) {
    console.log(event);
  }
}
