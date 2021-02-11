import { Component, Input, OnInit } from '@angular/core';
import { GearSlots } from '../character/gearslot';
import { GemSocketColor, Item } from '../item/item';
import { GearSlotComponent } from '../gear-slot/gear-slot.component';
import { SharedDataService } from '../shared/shared-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GemService } from '../item/gem.service';
import { Gem, GemColor, GemQuality } from '../item/gem';
import { ItemStats, ItemStatsEnum } from '../item/item-stats';

@Component({
  selector: 'app-gear-alteration',
  templateUrl: './gear-alteration.component.html',
  styleUrls: ['./gear-alteration.component.scss']
})
export class GearAlterationComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService, private gemService: GemService) { }

  @Input()
  gearSlot!: GearSlots;
  GemSocketColor = GemSocketColor

  possibleGems!: Gem[]



  item!: Item;

  ngOnInit(): void {
    this.sharedDataService.character.subscribe(character => {
      this.item = character.gear[this.gearSlot as keyof typeof GearSlots]
    })
    this.initGems()
  }

  async initGems() {
    this.possibleGems = await this.gemService.getGems();

  }

  ////  Remove after gems are added

  addForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    color: new FormControl(''),
    quality: new FormControl(''),
    statOne: new FormControl(''),
    valueOne: new FormControl(''),
    statTwo: new FormControl(''),
    valueTwo: new FormControl('')
  })

  attributes = Object.values(ItemStatsEnum).sort()
  quality = Object.values(GemQuality)
  gemColor = Object.values(GemColor);

  async addGem() {
    const name = this.addForm.get('name')?.value
    const color = this.addForm.get('color')?.value
    const quality = this.addForm.get('quality')?.value
    const statOne = this.addForm.get('statOne')?.value
    const valueOne = this.addForm.get('valueOne')?.value
    const statTwo = this.addForm.get('statTwo')?.value
    const valueTwo = this.addForm.get('valueTwo')?.value
    const gem = new Gem(name, color, quality, { [statOne as keyof ItemStats]: valueOne })
    if (statTwo) {
      gem.stats[statTwo as keyof ItemStats] = valueTwo;
    }
    await this.gemService.putGem(gem);
    this.addForm.controls.name.reset();
    this.addForm.controls.valueOne.reset();
    this.addForm.controls.valueTwo.reset();
  }




}
