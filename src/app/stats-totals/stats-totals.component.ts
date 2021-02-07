import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Character } from '../character/character';
import { ItemStats, ItemStatsEnum } from '../character/item-stats';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-stats-totals',
  templateUrl: './stats-totals.component.html',
  styleUrls: ['./stats-totals.component.scss']
})
export class StatsTotalsComponent implements OnInit {

  constructor(private SharedDataService: SharedDataService) { }

  character!: Character;
  ItemStatsEnum = ItemStatsEnum;

  ngOnInit(): void {
    this.character = this.SharedDataService.character;
  }

  calculateTotalStats(stat: ItemStatsEnum): number {
    let total = 0;
    total += this.character.stats[stat] || 0;
    Object.entries(this.character.gear).forEach(([slot, item]) => {
      total += item.stats[stat] || 0;
    })
    return total;
  }

  calculateAttackPower(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.strength) * 2;
    total += this.calculateTotalStats(ItemStatsEnum.attackPower);
    return total;
  }

  calculateMana(): number{
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.intellect) * 15;
    return total;
  }
  calculateHealth(): number{
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.stamina) * 10;
    return total;

  }
  calculateArmor(): number{
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.agility) * 2;
    total += this.calculateTotalStats(ItemStatsEnum.armor);
    return total;
  }

  calculateCrit(): number{
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.meleeCrit);
    total += this.calculateTotalStats(ItemStatsEnum.agility) / 20;
    return total;
  }

  calculateSpellCrit(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.spellCrit);
    total += this.calculateTotalStats(ItemStatsEnum.intellect) / 54;
    return total;
  }

  calculateMissChance(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.defense) * 0.04
    return total;
  }

  calculateDodgeChance(): number {
    const agility = this.calculateTotalStats(ItemStatsEnum.agility);
    const itemDodge = this.calculateTotalStats(ItemStatsEnum.dodge);
    const defenseSkill = this.calculateTotalStats(this.ItemStatsEnum.defense);
    return 0.7 + (agility / 19.767) + itemDodge + ((defenseSkill - 365) * 0.04);
  }

  calculateBlockValue(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.blockValue)
    total += this.calculateTotalStats(ItemStatsEnum.strength) / 20
    return total;
  }

  calculateParry():number {
    const parryRating = this.calculateTotalStats(ItemStatsEnum.parry);
    const defenseSkill = this.calculateTotalStats(this.ItemStatsEnum.defense);
    return 5 + parryRating + ((defenseSkill - 365) * 0.04)
  }

  calculateBlock(): number {
    const blockRating = this.calculateTotalStats(ItemStatsEnum.block);
    const defenseSkill = this.calculateTotalStats(this.ItemStatsEnum.defense);
    return 5 + blockRating + ((defenseSkill - 365) * 0.04)
  }

}


//https://classic.wowhead.com/guides/classic-wow-stats-and-attributes-overview
