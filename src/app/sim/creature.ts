import { AttackTable } from "../shared/attack-table";
import { DamageType, Resistances } from "../shared/magic-school";

export class Creature {
  _id!: number;
  id!: number;
  minMeleeDamage: number = 4715
  maxMeleeDamage: number = 7508
  attackSpeed: number = 2;
  specialAttacks!: specialAttacksInterface[];
  armor: number = 7700;
  resistances!: Resistances[]
  level: number = 73;
  buffs: { [key: string]: any } = {}
  debuffs: { [key: string]: any } = {}


  /////////// coppied from character ////////////////
  get AttackTable(): AttackTable {
    return {
      miss: -0.6,
      dodge: -0.6, // 1 expertise reduces dodge chance by 0.25%
      parry: -0.6, // 1 expertise reduces dodge chance by 0.25%,
      glancing: 0,
      block: -0.6, //most bosses can't block
      crit: 5.6,
      crushing: 15, //characters cannot crush bosses
      hit: 0 // whatever the rest is
    }
  }
}


export interface specialAttacksInterface {
  name: string;
  damage: number;
  school: DamageType
}
