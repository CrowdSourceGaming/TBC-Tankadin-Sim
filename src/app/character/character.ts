import { GearSlots } from "./gearslot";
import { Item, WeaponType } from "../item/item";
import { ItemStats, ItemStatsEnum } from "../item/item-stats";
import { Race, Races } from "./races/race";
import { Spec } from "./spec";

import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { AttackTable } from "../shared/attack-table";

@Serializable()
export class Character {
  @JsonProperty() spec: Spec;
  gear: { [key in GearSlots]: Item }
  @JsonProperty() baseStats: ItemStats;
  @JsonProperty() race: Race
  level = 70;
  buffs = []
  debuffs = [];


  constructor(race: Races = Races.human) {
    this.spec = new Spec();
    this.gear = this.initGear();
    this.baseStats = level70PaladinStats;
    this.race = new Race(race);
  }

  getStatTotal(stat: ItemStatsEnum): number {
    const statValues = this.getStatValue(stat);
    const statMultipliers = this.getStatMultiplier(stat);
    return statValues * (1 + statMultipliers);
  }

  private getStatValue(stat: ItemStatsEnum): number {
    return this.sum([
      this.baseStats[stat] || 0,
      this.spec.getValues()[stat] || 0,
      this.race.stats[stat] || 0,
      this.raceBonuses[stat] || 0,
      this.calculateGearStats(stat)])
  }

  private getStatMultiplier(stat: ItemStatsEnum): number {
    return this.sum([
      this.spec.getMultipliers()[stat] || 0
    ]);
  }

  private calculateGearStats(stat: ItemStatsEnum): number {
    let total = 0;
    Object.keys(this.gear).forEach((slot) => {
      const item: Item = this.gear[slot as keyof typeof GearSlots]
      if (item) {
        total += item.getTotalConfiguredStats()[stat] || 0;
      }
    })
    return total;
  }

  private sum(stats: number[]) {
    return stats.reduce((a, b) => a + b, 0)
  }

  /* ************************** STATS *************************** */
  get totalMana(): number {
    return this.getStatTotal(ItemStatsEnum.intellect) * 15;
  }
  get totalHealth(): number {
    return this.getStatTotal(ItemStatsEnum.stamina) * 10;
  }


  /* ************************** MELEE *************************** */
  get expertise(): number {
    let total = this.getStatTotal(ItemStatsEnum.expertiseRating) / 15.77
    total += this.getStatTotal(ItemStatsEnum.meleeExpertise);
    return total;
  }

  get hitChance(): number {
    let total = this.getStatTotal(ItemStatsEnum.meleeHitRating) / 15.77;
    total += this.getStatTotal(ItemStatsEnum.meleeHitPercent);
    return total
  }

  get attackPower(): number {
    let total = 0;
    total += this.getStatTotal(ItemStatsEnum.strength) * 2;
    total += this.getStatTotal(ItemStatsEnum.attackPower);
    return total;
  }

  get meleeCrit(): number {
    let total = 0;
    total += this.getStatTotal(ItemStatsEnum.meleeCritRating) / 22.08;
    total += this.getStatTotal(ItemStatsEnum.agility) / 20;
    return total;
  }

  get haste(): number {
    return this.getStatTotal(ItemStatsEnum.hasteRating) / 15.77
  }

  get armorPen(): number {
    return this.getStatTotal(ItemStatsEnum.armorPenRating) / 5.92
  }

  get weaponDamageMin(): number {
    const weapon = this.gear.mainHand
    let damage = weapon.stats.damageMin || 1;
    damage += this.attackPower / (14 * (weapon.stats.attackSpeed || 2))
    return damage || 1;
  }

  get weaponDamageMax(): number {
    const weapon = this.gear.mainHand
    let damage = weapon.stats.damageMax || 10;
    damage += this.attackPower / (14 * (weapon.stats.attackSpeed || 2))
    return damage || 10;
  }

  get attackSpeed(): number {
    return (this.gear.mainHand?.stats?.attackSpeed) || 2;
  }

  /* ************************** DEFENSE *************************** */
  get defense(): number {
    let total = 350 + (this.getStatTotal(ItemStatsEnum.defenseRating) / 2.37);
    total += this.getStatTotal(ItemStatsEnum.defenseValue)
    return total;
  }

  get armor(): number {
    let total = 0;
    total += this.getStatTotal(ItemStatsEnum.agility) * 2;
    total += this.getStatValue(ItemStatsEnum.armor);
    return total * (1 + this.getStatMultiplier(ItemStatsEnum.armor));
  }

  get missChance(): number {
    let total = this.getStatTotal(ItemStatsEnum.defenseRating) / 59.25 // 14.8125 * 4
    total += this.getStatTotal(ItemStatsEnum.defenseValue) / (59.25 / 2.36); // 1 defense skill = 2.36 defense rating
    return 5 + total;
  }

  get dodgeChance(): number {
    const agility = this.getStatTotal(ItemStatsEnum.agility);
    const itemDodge = this.getStatTotal(ItemStatsEnum.dodgeRating) / 18.92;
    const defenseDodge = this.getStatTotal(ItemStatsEnum.defenseRating) / 59.25;
    const defenseValueDodge = this.getStatTotal(ItemStatsEnum.defenseValue) / (59.25 / 2.36);
    return 0.7 + (agility / 19.767) + itemDodge + defenseDodge + defenseValueDodge;
  }

  get blockValue(): number {
    let total = 0;
    total += this.getStatTotal(ItemStatsEnum.strength) / 20
    total += this.getStatValue(ItemStatsEnum.blockValue)
    return total * (1 + this.getStatMultiplier(ItemStatsEnum.blockValue));
  }

  get parry(): number {
    const parryRating = this.getStatTotal(ItemStatsEnum.parryRating) / 23.65;
    const parryValue = this.getStatTotal(ItemStatsEnum.parryValue);
    const defenseParry = this.getStatTotal(ItemStatsEnum.defenseRating) / 59.25;
    const defenseValueParry = this.getStatTotal(ItemStatsEnum.defenseValue) / (59.25 / 2.36);
    return 5 + parryRating + defenseParry + defenseValueParry + parryValue;
  }

  get blockChance(): number {
    const blockRating = this.getStatTotal(ItemStatsEnum.blockRating) / 7.88;
    const defenseBlockChance = this.getStatTotal(ItemStatsEnum.defenseRating) / 59.25;
    const defenseValueBlockChance = this.getStatTotal(ItemStatsEnum.defenseValue) / (59.25 / 2.36);
    return 5 + blockRating + defenseBlockChance + defenseValueBlockChance
  }

  get mitigationChance(): number {
    return this.missChance + this.dodgeChance + this.parry + this.blockChance;
  }

  /* ************************** SPELL *************************** */
  get spellCrit(): number {
    let total = 0;
    total += this.getStatTotal(ItemStatsEnum.spellCritRating);
    total += this.getStatTotal(ItemStatsEnum.intellect) / 54;
    return total;
  }

  get spellHit(): number {
    let total = this.getStatTotal(ItemStatsEnum.spellHitRating) / 12.62
    total += this.getStatTotal(ItemStatsEnum.spellHitPercent)
    return total
  }

  get spellDamage(): number {
    return this.getStatTotal(ItemStatsEnum.spellDamage);
  }


  get attackTable(): AttackTable {
    return {
      miss: 9 - this.hitChance,
      dodge: 6.5 - (this.expertise / 4), // 1 expertise reduces dodge chance by 0.25%
      parry: 14 - (this.expertise / 4), // 1 expertise reduces dodge chance by 0.25%,
      glancing: 25,
      block: 0, //most bosses can't block
      crit: 0 + this.meleeCrit,
      crushing: 0, //characters cannot crush bosses
      hit: 0 // whatever the rest is
    }
  }

  /* ************************** PRIVATE *************************** */

  private initGear() {
    return {
      head: new Item(),
      neck: new Item(),
      shoulder: new Item(),
      back: new Item(),
      chest: new Item(),
      wrist: new Item(),
      hands: new Item(),
      waist: new Item(),
      legs: new Item(),
      feet: new Item(),
      fingerOne: new Item(),
      fingerTwo: new Item(),
      trinketOne: new Item(),
      trinketTwo: new Item(),
      mainHand: new Item(),
      offHand: new Item(),
      relic: new Item()
    };
  }

  private get raceBonuses(): ItemStats {
    const stats: ItemStats = {};
    if (this.race.name === Races.human && (
      (this.gear.mainHand.weaponType === WeaponType.oneHandedMace) ||
      (this.gear.mainHand.weaponType === WeaponType.twoHandedMace) ||
      (this.gear.mainHand.weaponType === WeaponType.oneHandedSword) ||
      (this.gear.mainHand.weaponType === WeaponType.twoHandedSword))) {

      stats.meleeExpertise = 5;
    }

    return stats;
  }
}

const level70PaladinStats: ItemStats = {
  strength: 104,
  agility: 57,
  stamina: 98,
  intellect: 63,
  spirit: 68,
}


// https://wowwiki-archive.fandom.com/wiki/Combat_rating_system
// https://classic.wowhead.com/guides/classic-wow-stats-and-attributes-overview
