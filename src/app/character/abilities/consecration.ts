import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class Consecration implements AbilityInterface {

  magicSchool: DamageType = DamageType.holy;
  name: string = 'Consecration';
  onGCD: boolean = true;
  internalCD: number = 8000;
  internalTickCD: number = 1000;
  duration: number = 8000;
  lastCastTime = -9999999999;
  lastTickTime = -9999999999;

  constructor() { };

  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {

  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    if (this.lastCastTime + this.internalCD <= timeElapsed) {
      defender.debuffs[this.name] = {active: true, expires: timeElapsed + 8000}
      this.lastCastTime = timeElapsed
      return true;
    }
    return false;
  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    const debuff = defender.debuffs[this.name]
    if(debuff && debuff.active && debuff.expires <=timeElapsed){
      debuff.active == false;
    }
    if(debuff && debuff.active && this.lastTickTime + this.internalTickCD <= timeElapsed){
      this.lastTickTime = timeElapsed;
      return {
        damageAmount: (512 + attacker.spellDamage) / 8,
        circumstance: this.name,
        damageType: DamageType.holy
      }
    }
  }
}
