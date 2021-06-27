import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class SealOfRighteousness implements AbilityInterface {
  magicSchool: DamageType = DamageType.holy;
  name: string = 'Seal of Righteousness';
  onGCD: boolean = true;
  internalCD: number = 0;
  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    if (attacker.buffs[this.name] && attacker.buffs[this.name].active === true && [AttackTableEnum.hit, AttackTableEnum.crit, AttackTableEnum.glancing].includes(rollResult)) {
      const baseDamage = 0.85 * (2113 * 1.2 * 1.03 * attacker.attackSpeed / 100) + 0.03 * (attacker.weaponDamageMax + attacker.weaponDamageMin) / 2 - 1
      let spellDamage = baseDamage + (0.092 * attacker.attackSpeed * attacker.spellDamage);
      spellDamage = spellDamage * (1 + (0.03 * attacker.spec.talents.improvedSoR))
      return {
        circumstance: this.name,
        damageAmount: spellDamage,
        damageType: DamageType.holy
      }
    }


  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    if (!attacker.buffs[this.name] || attacker.buffs[this.name].active === false || attacker.buffs[this.name].expires - 5000 <= timeElapsed) {
      attacker.buffs[this.name] = { active: true, expires: timeElapsed + 30000 }
      return true;
    } else {
      return false;
    }
  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    const buff = attacker.buffs[this.name]
    if (buff && buff.active && buff.expires <= timeElapsed) {
      buff.active = false;
    }
  }
}
