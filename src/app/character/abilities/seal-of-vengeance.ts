import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class SealOfVengeance implements AbilityInterface {
  id = 31801
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
        const binaryResist = (Math.random() * 100 > (100 - 17 + attacker.spellHit))
        if (didProc && !binaryResist) {
          if (!defender.debuffs[this.name]) {
            defender.debuffs[this.name] = { stacks: 0, lastDamageAppliedTimestamp: -9999999999, expires: -999999999 };
          }
          defender.debuffs[this.name].lastStackAppliedTimestamp = timeElapsed
          let currentStacks = defender.debuffs[this.name].stacks;
          if (currentStacks === 5) {
            // const damage = ((150 / 15 + (attacker.spellDamage * 0.034)) * attacker.attackSpeed) * 5
            const damageAmt = (10 + (attacker.spellDamage * 0.014)) * (attacker.gear.mainHand.stats.attackSpeed || 2)
            const damage: damageTakenInterface = {
              circumstance: 'Seal of Vengeance',
              damageAmount: damageAmt,
              damageType: this.magicSchool
            }
            const critRoll = Math.random() * 100
            if (critRoll <= attacker.spellCrit) {
              damage.damageAmount = damage.damageAmount * 1.5
              damage.comment = 'CRITICAL'
            }
            return damage
          } else {
            defender.debuffs[this.name].stacks += 1;
          }
        }
      }
    }
  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    if (!attacker.buffs[this.name] || attacker.buffs[this.name].active === false || attacker.buffs[this.name].expires - 5000 <= timeElapsed) {
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
      let damagePer15 = (150 + (attacker.spellDamage * (0.034 * numOfStacks))) * numOfStacks;
      const damagePerTick = damagePer15 / 5  // one tick every 3 seconds
      defender.debuffs[this.name].lastDamageAppliedTimestamp = timeElapsed;
      return {
        circumstance: 'Holy Vengeance',
        damageAmount: damagePerTick,
        damageType: this.magicSchool,
        comment: `${numOfStacks} stacks`
      }
    }
  }
}
