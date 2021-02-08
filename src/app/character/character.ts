import { GearSlots } from "./gearslot";
import { Item } from "./item";
import { ItemStats, ItemStatsEnum } from "./item-stats";
import { getRaceAttributeValues, Races } from "./races/race";
import { Spec } from "./spec";

export class Character {
  spec: Spec;
  gear: { [key in GearSlots]: Item }
  baseStats: ItemStats;

  constructor(race: Races = Races.human) {
    this.spec = new Spec();
    this.gear = this.initGear();
    this.baseStats = this.initStats(race);
  }

  calculateTotalStats(stat: ItemStatsEnum): number {
    let total = 0;
    total += this.baseStats[stat] || 0;
    Object.entries(this.gear).forEach(([slot, item]) => {
      total += item.stats[stat] || 0;
    })
    return total;
  }

  /* ************************** STATS *************************** */
  get totalMana(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.intellect) * 15;
    return total;
  }
  get totalHealth(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.stamina) * 10;
    return total;

  }

  /* ************************** MELEE *************************** */
  get expertise(): number {
    return this.calculateTotalStats(ItemStatsEnum.expertiseRating) / 15.77;
  }

  get hitChance(): number {
    return this.calculateTotalStats(ItemStatsEnum.meleeHitRating) / 15.77;
  }

  get attackPower(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.strength) * 2;
    total += this.calculateTotalStats(ItemStatsEnum.attackPower);
    return total;
  }

  get meleeCrit(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.meleeCritRating) / 22.08;
    total += this.calculateTotalStats(ItemStatsEnum.agility) / 20;
    return total;
  }

  get haste(): number {
    return this.calculateTotalStats(ItemStatsEnum.hasteRating) / 15.77
  }

  get armorPen(): number {
    return this.calculateTotalStats(ItemStatsEnum.armorPenRating) / 5.92
  }

  /* ************************** DEFENSE *************************** */
  get defense(): number {
    return 350 + (this.calculateTotalStats(ItemStatsEnum.defenseRating) / 2.37);
  }

  get armor(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.agility) * 2;
    total += this.calculateTotalStats(ItemStatsEnum.armor);
    return total;
  }

  get missChance(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.defenseRating) / 59.25 // 14.8125 * 4
    return 5 + total;
  }

  get dodgeChance(): number {
    const agility = this.calculateTotalStats(ItemStatsEnum.agility);
    const itemDodge = this.calculateTotalStats(ItemStatsEnum.dodgeRating) / 18.92;
    const defenseDodge = this.calculateTotalStats(ItemStatsEnum.defenseRating) / 59.25;
    return 0.7 + (agility / 19.767) + itemDodge + defenseDodge;
  }

  get blockValue(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.blockValue)
    total += this.calculateTotalStats(ItemStatsEnum.strength) / 20
    return total;
  }

  get parry(): number {
    const parryRating = this.calculateTotalStats(ItemStatsEnum.parryRating) / 23.65;
    const defenseDodge = this.calculateTotalStats(ItemStatsEnum.defenseRating) / 59.25;
    return 5 + parryRating + defenseDodge;
  }

  get blockChance(): number {
    const blockRating = this.calculateTotalStats(ItemStatsEnum.blockRating) / 7.88;
    const defenseBlockChance = this.calculateTotalStats(ItemStatsEnum.defenseRating) / 59.25;
    return 5 + blockRating + defenseBlockChance
  }

  get mitigationChance(): number {
    return this.missChance + this.dodgeChance + this.parry + this.blockChance;
  }

  /* ************************** SPELL *************************** */
  get spellCrit(): number {
    let total = 0;
    total += this.calculateTotalStats(ItemStatsEnum.spellCritRating);
    total += this.calculateTotalStats(ItemStatsEnum.intellect) / 54;
    return total;
  }

  get spellHit(): number {
    return this.calculateTotalStats(ItemStatsEnum.spellHitRating) / 12.62
  }

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

  private initStats(race: Races): ItemStats {
    const raceAttributes = getRaceAttributeValues(race);
    const result: ItemStats = {};
    [raceAttributes, level70PaladinStats].forEach(startingStat => {
      for (let [key, value] of Object.entries(startingStat)) {
        if (result[key as keyof ItemStats]) {
          result[key as keyof ItemStats] += value;
        } else {
          result[key as keyof ItemStats] = value;
        }
      }
    })
    return result;
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
