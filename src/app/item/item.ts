import { JsonProperty, Serializable } from "typescript-json-serializer";
import { GemSocket } from "../gem-socket";
import { GearSlots } from "../character/gearslot";
import { ItemStats, ItemStatsEnum } from "./item-stats";
import { GemColor } from "./gem";
import { Enchant } from "./enchant";

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
  @JsonProperty() enchant: Enchant | null = null;
  @JsonProperty() unique: boolean

  constructor(gearType: GearSlots | null = null, id: number = 0, name: string = '', stats: ItemStats = {}, unique: boolean = false) {
    this.name = name;
    this.id = id;
    this._id = id;
    this.validSlot = gearType;
    this.stats = stats;
    this.unique = unique
  }

  getTotalConfiguredStats(): ItemStats {
    const totals: ItemStats = JSON.parse(JSON.stringify(this.stats));
    this.addGemValuesToTotal(totals);
    this.addEnchantValuesToTotal(totals);
    return totals;
  }

  private addEnchantValuesToTotal(totals: ItemStats): void {
    if (this.enchant) {
      Object.keys(this.enchant.stats).forEach(stat => {
        if (!totals[stat as keyof typeof ItemStatsEnum]) {
          totals[stat as keyof typeof ItemStatsEnum] = 0;
        }
        totals[stat as keyof typeof ItemStatsEnum]! += +(this.enchant!.stats[stat as keyof typeof ItemStatsEnum] || 0);
      })
    }
  }

  private addGemValuesToTotal(totals: ItemStats): void {
    let applySocketBonus: boolean = true;
    this.gemSockets.forEach(socket => {
      if (socket.gem) {
        const stats = socket.gem.stats;
        Object.keys(stats).forEach(stat => {
          if (!totals[stat as keyof typeof ItemStatsEnum]) {
            totals[stat as keyof typeof ItemStatsEnum] = 0;
          }
          totals[stat as keyof typeof ItemStatsEnum]! += +(socket.gem?.stats[stat as keyof typeof ItemStatsEnum] || 0);
        });
        if (!matchingGemColors[socket.color as keyof typeof GemSocketColor].includes(socket.gem.color)) {
          applySocketBonus = false;
        }
      } else {
        applySocketBonus = false;
      }
    });
    if (applySocketBonus && Object.keys(this.gemSocketBonus).length > 0) {
      const socketBonusAttribute = Object.keys(this.gemSocketBonus)[0];
      if (!totals[socketBonusAttribute as keyof typeof ItemStatsEnum]) {
        totals[socketBonusAttribute as keyof typeof ItemStatsEnum] = 0;
      }
      totals[socketBonusAttribute as keyof typeof ItemStatsEnum]! += +(this.gemSocketBonus[socketBonusAttribute as keyof typeof ItemStatsEnum] || 0);
    }
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
  felsteel = 'Felsteel',
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

const matchingGemColors = {
  [GemSocketColor.blue]: [GemColor.blue, GemColor.purple, GemColor.green],
  [GemSocketColor.red]: [GemColor.red, GemColor.purple, GemColor.orange],
  [GemSocketColor.yellow]: [GemColor.yellow, GemColor.green, GemColor.orange],
  [GemSocketColor.meta]: [GemColor.meta]
}
