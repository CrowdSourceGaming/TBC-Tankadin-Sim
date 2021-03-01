import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class AvengersShield implements AbilityInterface {
  magicSchool: DamageType = DamageType.holy;
  name: string = 'Avenger\'s Shield'
  onGCD: boolean = true;
  internalCD: number = 30000;
  lastCastTime: number = -999999999;
  castingDuration: number = 1000;
  damageOnTime: number = -999999999;

  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {

  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    if (attacker.spec.talents.AvengersShield && this.lastCastTime + this.internalCD <= timeElapsed) {
      this.damageOnTime = timeElapsed + this.castingDuration;
      return true;
    }
    return false;
  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    if (this.damageOnTime === timeElapsed) {
      this.lastCastTime = timeElapsed;
      const missChance = Math.max(17 - attacker.spellHit, 1);
      const roll = Math.random() * 100
      if (roll <= missChance) {
        return {
          circumstance: this.name,
          damageAmount: 1,
          damageType: DamageType.holy,
          comment: `Resist`
        }
      }
      const minDamage = 494
      const maxDamage = 602
      const spellPowerDamageAdded = attacker.spellDamage * 0.1357
      const damage: damageTakenInterface = {
        circumstance: this.name,
        damageAmount: (Math.random() * (maxDamage - minDamage)) + minDamage + spellPowerDamageAdded,
        damageType: DamageType.holy
      }
      const critRoll = Math.random() * 100
      if (critRoll <= attacker.spellCrit) {
        damage.damageAmount = damage.damageAmount * 1.5
        damage.comment = 'CRITICAL'
      }
      return damage;
    }
  }

}
