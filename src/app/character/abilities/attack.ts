import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class Attack implements AbilityInterface {

  magicSchool: DamageType;
  name: string;
  onGCD: boolean;
  internalCD: number = 0;

  constructor() {
    this.magicSchool = DamageType.physical;
    this.name = 'Attack'
    this.onGCD = false;
  }
  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature): void | damageTakenInterface {
    let damage = 1;
    if (rollResult && rollResult !== AttackTableEnum.miss && rollResult !== AttackTableEnum.dodge && rollResult !== AttackTableEnum.parry) {
      damage = rollDamage(attacker.weaponDamageMin, attacker.weaponDamageMax, defender)
      if (rollResult === AttackTableEnum.glancing) {
        damage = damage * 0.65
      } else if (rollResult === AttackTableEnum.crit) {
        damage = damage * 2;
      } else if (rollResult === AttackTableEnum.block) {
        damage = damage - 54
      }
    }
    return {
      damageAmount: Math.round(damage),
      damageType: DamageType.physical,
      circumstance: this.name,
      comment: rollResult
    }
  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    return false;
  }
  onCheck(attacker: Character, defender: Creature,  timeElapsed: number): void | damageTakenInterface {

  }
}



const rollDamage = (damageMin: number, damageMax: number, defender: Creature | Character): number => {
  const rawDamage = Math.floor(Math.random() * (damageMax - damageMin + 1) + damageMin);
  const armorReduction = defender.armor / (defender.armor - 22167.5 + 467.5 * defender.level)
  return rawDamage * armorReduction
}
