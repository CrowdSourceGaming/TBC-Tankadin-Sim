import { Armor } from "../character/armor";
import { ItemType } from "../character/item-stats";

export const head: Armor[] = [
  new Armor(ItemType.head, 21387, "Avenger's Crown", {
    armor: 739,
    intellect: 22,
    meleeCrit: 1,
    spellPower: 23,
    stamina: 22,
    strength: 20,
    agility: 12,
    spirit: 12
  }),
  new Armor(ItemType.head, 16955, "Judgement Crown", {
    armor: 696,
    intellect: 23,
    spellPower: 32,
    spirit: 6,
    stamina: 18,
    strength: 17
  }),
]
