import { Character } from "src/app/character/character";
import { BossAbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "../creature";

export class BossAttack implements BossAbilityInterface {
  magicSchool: DamageType;
  name: string;

  constructor() {
    this.magicSchool = DamageType.physical;
    this.name = 'Boss Attack'
  }
  onHit(rollResult: AttackTableEnum, attacker: Creature, defender: Character): void | damageTakenInterface {
    let damage = 0;
    if (rollResult && rollResult !== AttackTableEnum.miss && rollResult !== AttackTableEnum.dodge && rollResult !== AttackTableEnum.parry) {
      damage = rollDamage(attacker.minMeleeDamage, attacker.maxMeleeDamage, defender)
      if (rollResult === AttackTableEnum.block) {
        damage = damage - defender.blockValue
      } else if (rollResult === AttackTableEnum.crit) {
        damage = damage * 2;
      } else if (rollResult === AttackTableEnum.crushing) {
        damage = damage * 1.5
      }
    }
    return {
      damageAmount: Math.round(damage),
      damageType: DamageType.physical,
      circumstance: rollResult
    }
  }
  onCast(attacker: Creature, defender: Character, timeElapsed: number): void | damageTakenInterface {
  }
  onCheck(attacker: Creature, defender: Character, timeElapsed: number): void | damageTakenInterface {
  }
}

const rollDamage = (damageMin: number, damageMax: number, defender: Creature | Character): number => {
  const rawDamage = Math.floor(Math.random() * (damageMax - damageMin + 1) + damageMin);
  const armorReduction = defender.armor / (defender.armor - 22167.5 + 467.5 * defender.level)
  return rawDamage * armorReduction
}

