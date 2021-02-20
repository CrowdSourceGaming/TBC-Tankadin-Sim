import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class Attack implements AbilityInterface {

  magicSchool: DamageType;
  name: string;

  constructor(attackSpeed: number) {
    this.magicSchool = DamageType.physical;
    this.name = 'Attack'
  }
  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature): void | damageTakenInterface {
    let damage = 0;
    if (rollResult && rollResult !== AttackTableEnum.miss && rollResult !== AttackTableEnum.dodge && rollResult !== AttackTableEnum.parry) {
      damage = rollDamage(attacker.weaponDamageMin, attacker.weaponDamageMax, defender)
      if (rollResult === AttackTableEnum.glancing) {
        damage = damage * 0.65
      } else if (rollResult === AttackTableEnum.crit) {
        damage = damage * 2;
      }
    }
    return {
      damageAmount: Math.round(damage),
      damageType: DamageType.physical,
      circumstance: rollResult
    }
  }
  onCast(attacker: Character, defender: Creature): void | damageTakenInterface {

  }
  onCheck(attacker: Character, defender: Creature,  timeElapsed: number): void | damageTakenInterface {

  }
}



const rollDamage = (damageMin: number, damageMax: number, defender: Creature | Character): number => {
  const rawDamage = Math.floor(Math.random() * (damageMax - damageMin + 1) + damageMin);
  const armorReduction = defender.armor / (defender.armor - 22167.5 + 467.5 * defender.level)
  return rawDamage * armorReduction
}
