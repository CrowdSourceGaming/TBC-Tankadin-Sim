import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class SealOfVengeance implements AbilityInterface {
  magicSchool: DamageType;
  name: string;
  onGCD: boolean;
  internalCD: number;

  lastApply = 0;

  constructor() {
    this.magicSchool = DamageType.holy;
    this.name = "Seal of Vengeance"
    this.onGCD = true;
    this.internalCD = 0;
  }
  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    if (attacker.buffs[this.name] && attacker.buffs[this.name].active) {
      if (rollResult && rollResult !== AttackTableEnum.miss && rollResult !== AttackTableEnum.dodge && rollResult !== AttackTableEnum.parry) {
        const procChance = 100 * (20 / 60 * attacker.attackSpeed);
        const didProc = (Math.random() * 100 <= procChance)
        if (didProc) {
          if (!defender.debuffs[this.name]) {
            defender.debuffs[this.name] = { stacks: 0, lastDamageAppliedTimestamp: -9999999999, expires: -999999999 };
          }
          defender.debuffs[this.name].lastStackAppliedTimestamp = timeElapsed
          let currentStacks = defender.debuffs[this.name].stacks;
          if (currentStacks === 5) {
            // apply melee damage
          } else {
            defender.debuffs[this.name].stacks += 1;
          }
        }
      }
    }
  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    if (!attacker.buffs[this.name] || attacker.buffs[this.name].active === false || attacker.buffs[this.name].expires - 5000 <= timeElapsed) {
      console.log(`${timeElapsed} - casted: ${this.name}`)
      attacker.buffs[this.name] = { active: true, expires: timeElapsed + 30000 }
      return true;
    }
    return false;
  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    if (attacker.buffs[this.name] && attacker.buffs[this.name].expires <= timeElapsed) {
      attacker.buffs[this.name].active = false;
    }
    if (defender.debuffs[this.name] && (defender.debuffs[this.name].lastStackAppliedTimestamp + 15000 <= timeElapsed)) {  //drop stacks if one hasn't been applied in the last 15 seconds
      defender.debuffs[this.name].stacks = 0;
    }
    if (defender.debuffs[this.name]?.lastDamageAppliedTimestamp + 3000 <= timeElapsed) {
      const numOfStacks = defender.debuffs[this.name].stacks;
      let damagePer15 = (150 + (attacker.spellDamage * 0.034)) * numOfStacks;
      const damagePerTick = damagePer15 / 5  // one tick every 3 seconds
      defender.debuffs[this.name].lastDamageAppliedTimestamp = timeElapsed;
      return {
        circumstance: 'SoV Dot',
        damageAmount: damagePerTick,
        damageType: this.magicSchool,
        comment: `${numOfStacks} stacks`
      }
    }
  }
}
