import { GearSlots } from "./gearslot";
import { ItemStats, ItemType } from "./item-stats";

export class Item {
  name: string = '';
  id: number = 0;
  _id: number;
  stats: ItemStats = {};
  validSlot: GearSlots | null;
  gemSockets: GemSocketColor[] = [];
  set: GearSet = GearSet.none;

  constructor(gearType: GearSlots | null = null, id: number = 0, name: string = '', stats: ItemStats = {}) {
    this.name = name;
    this.id = id;
    this._id = id;
    this.validSlot = gearType;
    this.stats = stats;

  }
}

export enum GemSocketColor {
  yellow = 'yellow',
  blue = 'blue',
  red = 'red',
  meta = 'meta'
}

export enum GearSet {
  none = 'None',
  righteous = 'Righteous',
  justicar = 'Justicar',
  crystalforge = 'Crystalforge',
  lightbringer = 'Lightbringer',
  lieutenantCommandersRedoubt = 'Lieutenant Commander\'s Redoubt',
  fieldMarshalsAegis = 'Field Marshal\'s Aegis',
  doomplateBattlegear = 'Doomplate Battlegear',
  grandMarshalsAegis = 'Grand Marshal\'s Aegis',
  grandMarshalsRedemption = 'Grand Marshal\'s Redemption',
  grandMarshalsVindication = 'Grand Marshal\'s Vindication',
  warlordsAegis = 'Warlord\'s Aegis'
}
