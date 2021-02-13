import { Component, Input, OnInit } from '@angular/core';
import { GearSlots } from '../character/gearslot';
import { Gem } from '../item/gem';
import { Item } from '../item/item';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-current-gems',
  templateUrl: './current-gems.component.html',
  styleUrls: ['./current-gems.component.scss']
})
export class CurrentGemsComponent implements OnInit {

  @Input()
  gearType!: GearSlots
  gear!: Item;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.character.subscribe(character => {
      this.gear = character.gear[this.gearType as keyof typeof GearSlots];
      this.gear.gemSockets
    })
  }


  getRarityClass(gem: Gem) {
    return `${gem.quality}-text`
  }

}
