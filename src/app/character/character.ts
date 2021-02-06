import { GearSlots } from "./gearslot";
import { Item } from "./item";
import { Spec } from "./spec";

export class Character {
  spec!: Spec;
  gear!: { [key in GearSlots]: Item }

  constructor() {
    this.init();
  }

  private init() {
    this.spec = new Spec();
    this.gear = {
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
}
