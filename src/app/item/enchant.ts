import { GearSlots } from "../character/gearslot";
import { ItemStats } from "./item-stats"

export interface Enchant {
  _id: number
  id: number
  name: string
  stats: ItemStats
  slot: GearSlots
  type: string
}
