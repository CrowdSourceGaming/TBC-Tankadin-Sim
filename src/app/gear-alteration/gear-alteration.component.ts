import { Component, Input, OnInit } from '@angular/core';
import { GearSlots } from '../character/gearslot';
import { GemSocketColor, Item } from '../item/item';
import { GearSlotComponent } from '../gear-slot/gear-slot.component';
import { SharedDataService } from '../shared/shared-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GemService } from '../item/gem.service';
import { Gem, GemColor, GemQuality } from '../item/gem';
import { ItemStats, ItemStatsEnum } from '../item/item-stats';
import { MatTableDataSource } from '@angular/material/table';

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
  GemQuality = Object.values(GemQuality)
  allStats = Object.values(ItemStatsEnum).sort();

  gemFilterForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    color: new FormControl(''),
    rarity: new FormControl(''),
    stat: new FormControl('')
  })

  attributes = Object.values(ItemStatsEnum).sort()
  quality = Object.values(GemQuality)
  gemColor = Object.values(GemColor);

  gems!: MatTableDataSource<Gem>

  displayedColumns: string[] = ['name', 'color', 'statOne', 'statTwo', 'anchor']

  item!: Item;

  ngOnInit(): void {
    this.sharedDataService.character.subscribe(character => {
      this.item = character.gear[this.gearSlot as keyof typeof GearSlots]
    })
    this.initGems()

    this.gemFilterForm.valueChanges.subscribe((value) => {
      this.gems.filter = value;
    })
  }

  async initGems() {
    const gems = await this.gemService.getGems();
    this.gems = new MatTableDataSource(gems.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
    this.gems.filterPredicate = this.gemFilter
  }

  getStat(gem: Gem, index: number) {
    if (index === 0 && gem.stats.healing) {
      return [`+${gem.stats.healing} healing`, `+${gem.stats.spellDamage} spell damage`]
    } else if (gem.stats.healing && index > 0) {
      const stats = Object.keys(gem.stats)
      const healingIdx = stats.findIndex(s => s === ItemStatsEnum.healing)
      stats.splice(healingIdx, 1);
      const spellDamageIdx = stats.findIndex(s => s === ItemStatsEnum.spellDamage)
      stats.splice(spellDamageIdx, 1);
      return [stats && gem.stats[stats[0] as keyof ItemStats] ? `+${gem.stats[stats[0] as keyof ItemStats]} ${stats}` : '']
    } else {
      const statKey = Object.keys(gem.stats)[index]
      return [statKey && gem.stats[statKey as keyof ItemStats] ? `+${gem.stats[statKey as keyof ItemStats]} ${statKey}` : '']
    }
  }

  getRarityClass(gem: Gem) {
    return `${gem.quality}-text`
  }

  insertGem(gem: Gem) {

  }

  private gemFilter(data: Gem, filter: any) {
    return (
      (filter.name !== '' ? data.name.includes(filter.name) : true) &&
      (filter.color !== '' ? data.color === filter.color : true) &&
      (filter.rarity !== '' ? data.quality === filter.rarity : true) &&
      (filter.stat !== '' ? Object.keys(data.stats).includes(filter.stat) : true)
    )
  }

  //////////  Remove after gems are added  ////////////////

  /*   addForm: FormGroup = new FormGroup({
      name: new FormControl(''),
      color: new FormControl(''),
      quality: new FormControl(''),
      statOne: new FormControl(''),
      valueOne: new FormControl(''),
      statTwo: new FormControl(''),
      valueTwo: new FormControl('')
    })



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
    } */




}
