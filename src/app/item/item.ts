import { JsonProperty, Serializable } from "typescript-json-serializer";
import { GemSocket } from "../gem-socket";
import { GearSlots } from "../character/gearslot";
import { ItemStats } from "./item-stats";

@Serializable()
export class Item {
  @JsonProperty() name: string = '';
  @JsonProperty() id: number = 0;
  @JsonProperty() _id: number;
  @JsonProperty() stats: ItemStats = {};
  @JsonProperty() validSlot: GearSlots | null;
  @JsonProperty() gemSockets: GemSocket[] = [];
  @JsonProperty() gemSocketBonus: ItemStats = {};
  @JsonProperty() set: GearSet = GearSet.none;
  @JsonProperty() weaponType?: WeaponType

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

export enum WeaponType {
  oneHandedMace = 'oneHandedMace',
  twoHandedMace = 'twoHandedMace',
  oneHandedSword = 'oneHandedSword',
  twoHandedSword = 'twoHandedSword',
  oneHandedAxe = 'oneHandedAxe',
  twoHandedAxe = 'twoHandedAxe',
  polearm = 'polearm'
}
