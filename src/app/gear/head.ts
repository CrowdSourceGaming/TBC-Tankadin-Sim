import { Armor } from "../character/armor";
import { ItemStatsEnum, ItemType } from "../character/item-stats";

export const head: Armor[] = [
  new Armor(ItemType.head, 29068, "Justicar Faceguard", {
    [ItemStatsEnum.armor]: 1227,
    [ItemStatsEnum.dodgeRating]: 24,
    [ItemStatsEnum.defenseRating]: 29,
    [ItemStatsEnum.stamina]: 43,
    [ItemStatsEnum.intellect]: 24,
    [ItemStatsEnum.spellDamage]: 27
  }),
  new Armor(ItemType.head, 30125, "Crystalforge Faceguard", {
    [ItemStatsEnum.armor]: 1355,
    [ItemStatsEnum.stamina]: 48,
    [ItemStatsEnum.intellect]: 28,
    [ItemStatsEnum.defenseRating]: 28,
    [ItemStatsEnum.blockRating]: 19,
    [ItemStatsEnum.spellDamage]: 36,
    [ItemStatsEnum.blockValue]: 40
  }),
]
