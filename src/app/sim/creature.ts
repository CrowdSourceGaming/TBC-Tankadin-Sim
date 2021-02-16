import { AttackTable } from "../shared/attack-table";
import { DamageType, Resistances } from "../shared/magic-school";

export class Creature {
  _id!: number;
  id!: number;
  basicMeleeDamage!: number;
  attackSpeed!: number;
  specialAttacks!: specialAttacksInterface[];
  armor!: number;
  resistances!: Resistances[]
  level: number = 73;


  /////////// coppied from character ////////////////
  /* get AttackTable(): AttackTable {
    return {
      miss: 9 - this.hitChance,
      dodge: 6.5 - (this.expertise / 4), // 1 expertise reduces dodge chance by 0.25%
      parry: 14 - (this.expertise / 4), // 1 expertise reduces dodge chance by 0.25%,
      glancing: 25,
      block: 0, //most bosses can't block
      crit: 0 + this.meleeCrit,
      crushing: 0, //characters cannot crush bosses
      hit: 0 // whatever the rest is
    }
  } */
}


export interface specialAttacksInterface {
  name: string;
  damage: number;
  school: DamageType
}
