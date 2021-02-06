import { Component, Input, OnInit } from '@angular/core';
import { GearSlots } from '../character/gearslot';
import { Item } from '../character/item';
import { RetrieveGearFactoryService } from '../gear/retrieve-gear-factory.service';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-gear-selector',
  templateUrl: './gear-selector.component.html',
  styleUrls: ['./gear-selector.component.scss']
})
export class GearSelectorComponent implements OnInit {

  @Input()
  gearType!: GearSlots;

  displayedColumns: string[] = ['armor', 'stamina', 'intellect', 'strength', 'agility', 'spirit', 'meleeHit',
    'meleeCrit', 'expertise', 'spellHit', 'spellCrit', 'spellPower'];

  gearOptions: Item[] = [];

  constructor(private sharedDataService: SharedDataService, private retriveGearFactoryService: RetrieveGearFactoryService) { }

  ngOnInit(): void {
    this.gearOptions = this.retriveGearFactoryService.getGearForSlot(this.gearType);
  }

  assignGear(item: Item) {
    this.sharedDataService.character.gear[this.gearType] = item;
  }

}
