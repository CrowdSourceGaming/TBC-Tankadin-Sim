import { GearSlots } from "./gearslot";
import { Item } from "./item";
import { ItemStats } from "./item-stats";
import { getRaceAttributeValues, Races } from "./races/race";
import { Spec } from "./spec";

export class Character {
  spec: Spec;
  gear: { [key in GearSlots]: Item }
  stats: ItemStats;

  constructor(race: Races = Races.human) {
    this.spec = new Spec();
    this.gear = this.initGear();
    this.stats = this.initStats(race);
    console.log('character', this);
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
  meleeHit: 5,
  attackRating: 350,
  meleeCrit: 5,
  defense: 350,
  miss: 5
}
