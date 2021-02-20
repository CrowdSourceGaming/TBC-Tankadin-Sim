import { Character } from "../character/character";
import { Creature } from "../sim/creature";
import { AttackTableEnum } from "./attack-table";
import { DamageType } from "./magic-school";

export interface AbilityInterface {
  magicSchool: DamageType
  name: string;
  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature): damageTakenInterface | void;
  onCast(attacker: Character, defender: Creature): damageTakenInterface | void;
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): damageTakenInterface | void
}


export interface damageTakenInterface {
  damageAmount: number
  damageType: DamageType
  circumstance: string
}
