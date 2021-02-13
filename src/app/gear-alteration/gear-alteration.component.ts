import { Component, OnInit } from '@angular/core';
import { GemSocketColor, Item } from '../item/item';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GemService } from '../item/gem.service';
import { Gem, GemColor, GemQuality } from '../item/gem';
import { ItemStats, ItemStatsEnum } from '../item/item-stats';
import { MatTableDataSource } from '@angular/material/table';
import { GearService, GemAlterationInterface } from '../gear/gear.service';

@Component({
  selector: 'app-gear-alteration',
  templateUrl: './gear-alteration.component.html',
  styleUrls: ['./gear-alteration.component.scss']
})
export class GearAlterationComponent implements OnInit {

  constructor(private gemService: GemService, private gearService: GearService) { }

  GemSocketColor = GemSocketColor
  GemSocketColors = Object.values(GemSocketColor)
  GemQuality = Object.values(GemQuality)
  allStats = Object.values(ItemStatsEnum).sort();

  gemAlterationSetBonusOne!: ItemStatsEnum;
  gemAlterationSetBonusTwo!: ItemStatsEnum;


  gemAlterations: GemAlterationInterface = {
    default: null,
    defaultMeta: null,
    logic: [
      { gem: null, setBonusAttribute: null, socketColor: null },
      { gem: null, setBonusAttribute: null, socketColor: null },
      { gem: null, setBonusAttribute: null, socketColor: null },
      { gem: null, setBonusAttribute: null, socketColor: null }
    ]
  }

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
    this.gems = new MatTableDataSource();
    this.gemService.gems.subscribe(gems => {
      gems.sort((a, b) => a.name < b.name ? -1 : 1)
      this.gems.filterPredicate = this.gemFilter
      this.gems.data = gems;
    })

    this.gemFilterForm.valueChanges.subscribe((value) => {
      this.gems.filter = value;
    })
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

  applyGemsToGear() {
    this.gemAlterations.logic[0].setBonusAttribute = this.gemAlterationSetBonusOne
    this.gemAlterations.logic[1].setBonusAttribute = this.gemAlterationSetBonusOne
    this.gemAlterations.logic[2].setBonusAttribute = this.gemAlterationSetBonusTwo
    this.gemAlterations.logic[3].setBonusAttribute = this.gemAlterationSetBonusTwo

    this.gearService.applyGemsToGear(this.gemAlterations)
  }

  private gemFilter(data: Gem, filter: any) {
    return (
      (filter.name !== '' ? data.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      (filter.color !== '' ? data.color === filter.color : true) &&
      (filter.rarity !== '' ? data.quality === filter.rarity : true) &&
      (filter.stat !== '' ? Object.keys(data.stats).includes(filter.stat) : true)
    )
  }
}
