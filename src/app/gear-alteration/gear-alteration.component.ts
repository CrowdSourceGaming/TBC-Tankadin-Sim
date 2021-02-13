import { Component, Input, OnInit } from '@angular/core';
import { GearSlots } from '../character/gearslot';
import { GemSocketColor, Item } from '../item/item';
import { GearSlotComponent } from '../gear-slot/gear-slot.component';
import { SharedDataService } from '../shared/shared-data.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { GemService } from '../item/gem.service';
import { Gem, GemColor, GemQuality } from '../item/gem';
import { ItemStats, ItemStatsEnum } from '../item/item-stats';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-gear-alteration',
  templateUrl: './gear-alteration.component.html',
  styleUrls: ['./gear-alteration.component.scss']
})
export class GearAlterationComponent implements OnInit {

  constructor(private gemService: GemService) { }

  GemSocketColor = GemSocketColor
  GemSocketColors = Object.values(GemSocketColor)
  GemQuality = Object.values(GemQuality)
  allStats = Object.values(ItemStatsEnum).sort();

  gemAlterations: GemAlterationInterface = {
    default: null,
    defaultMeta: null,
    logic: []
  }

  gemFilterForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    color: new FormControl(''),
    rarity: new FormControl(''),
    stat: new FormControl('')
  })

  ruleFormGroup: FormGroup = new FormGroup({
    setBonusAttribute: new FormControl('', [Validators.required]),
    gemSocketColor: new FormControl('', [Validators.required]),
    gem: new FormControl(null, [Validators.required])
  })

  defaultRuleFormGroup: FormGroup = new FormGroup({
    defaultGem: new FormControl('', [Validators.required]),
    defaultMetaGem: new FormControl('', [Validators.required])
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

  private gemFilter(data: Gem, filter: any) {
    return (
      (filter.name !== '' ? data.name.includes(filter.name) : true) &&
      (filter.color !== '' ? data.color === filter.color : true) &&
      (filter.rarity !== '' ? data.quality === filter.rarity : true) &&
      (filter.stat !== '' ? Object.keys(data.stats).includes(filter.stat) : true)
    )
  }
}

export interface GemInsertionLogic {
  setBonusAttribute: ItemStatsEnum,
  socketColor: GemSocketColor,
  gem: Gem
}

export interface GemAlterationInterface {
  default: Gem | null,
  defaultMeta: Gem | null,
  logic: GemInsertionLogic[]
}
