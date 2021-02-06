import { GearSlots } from "./gearslot";
import { ItemStats, ItemType } from "./item-stats";

export class Item {
  name: string = '';
  id: number = 0;
  stats: ItemStats = {};
  validSlots: GearSlots[];

  constructor(gearType: ItemType = ItemType.unkown, id: number = 0, name: string = '', stats: ItemStats = {}) {
    this.name = name;
    this.id = id;
    this.validSlots = this.getValidSlots(gearType);
    this.stats = stats;
  }

  private getValidSlots(gearType: ItemType): GearSlots[] {
    const validSlots: GearSlots[] = [];
    if (gearType === ItemType.mainHand || gearType === ItemType.oneHand) {
      validSlots.push(GearSlots.mainHand);
    }
    if (gearType === ItemType.oneHand || gearType === ItemType.offHand || gearType === ItemType.shield){
      validSlots.push(GearSlots.offHand);
    }
    return validSlots;
  }
}
