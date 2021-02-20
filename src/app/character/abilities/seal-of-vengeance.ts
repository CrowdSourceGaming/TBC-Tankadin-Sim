import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class SealOfVengeance implements AbilityInterface {
  magicSchool: DamageType;
  name: string;

  lastApply = 0;

  constructor() {
    this.magicSchool = DamageType.holy;
    this.name = "Seal of Vengeance"
  }
  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature): void | damageTakenInterface {
    if (rollResult && rollResult !== AttackTableEnum.miss && rollResult !== AttackTableEnum.dodge && rollResult !== AttackTableEnum.parry) {
      const procChance = 100 * (20 / 60 * attacker.attackSpeed);
      const didProc = (Math.random() * 100 <= procChance)
      if (didProc) {
        if (!defender.debuffs[this.name]) {
          defender.debuffs[this.name] = { stacks: 0, lastDamageAppliedTimestamp: -9999999999 };
        }
        const currentStacks = defender.debuffs[this.name].stacks;
        if (currentStacks === 5) {
          // apply melee damage
        } else {
          defender.debuffs[this.name].stacks += 1;
        }
      }
    }
  }
  onCast(attacker: Character, defender: Creature): void | damageTakenInterface {

  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    if (defender.debuffs[this.name].lastDamageAppliedTimestamp < 3000 - timeElapsed) {
      const numOfStacks = defender.debuffs[this.name].stacks;
      const damagePer15 = (150 + (attacker.spellDamage * 0.034)) * numOfStacks;
      const damagePerTick = damagePer15 / 5  // one tick every 3 seconds
      return {
        circumstance: 'SoV Dot',
        damageAmount: damagePerTick,
        damageType: this.magicSchool
      }
    }
  }
}
