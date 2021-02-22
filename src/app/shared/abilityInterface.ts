import { Character } from "../character/character";
import { Creature } from "../sim/creature";
import { AttackTableEnum } from "./attack-table";
import { DamageType } from "./magic-school";

export interface AbilityInterface {
  magicSchool: DamageType
  name: string;
  onGCD: boolean;
  internalCD: number
  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature, timeElapsed: number): damageTakenInterface | void;
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean;
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): damageTakenInterface | void
}

export interface BossAbilityInterface {
  magicSchool: DamageType
  name: string;
  onHit(rollResult: AttackTableEnum, attacker: Creature, defender: Character): damageTakenInterface | void;
  onCast(attacker: Creature, defender: Character, timeElapsed: number): damageTakenInterface | void;
  onCheck(attacker: Creature, defender: Character, timeElapsed: number): damageTakenInterface | void
}


export interface damageTakenInterface {
  damageAmount: number
  damageType: DamageType
  circumstance: string
  comment?: string
}
