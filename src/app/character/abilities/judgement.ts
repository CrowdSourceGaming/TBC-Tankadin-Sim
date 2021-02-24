import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class Judgement implements AbilityInterface {
  magicSchool: DamageType = DamageType.holy;
  name: string = 'Judgement';
  onGCD: boolean = false;
  internalCD: number = 10000;
  lastCasted: number = -999999999;
  doDamage = {
    activate: false,
    seal: ''
  }

  constructor() { }

  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {

  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    if (this.lastCasted + this.internalCD <= timeElapsed) {
      this.internalCD = 10000 - (attacker.spec.talents.impJudgement * 1000);
      if (attacker.buffs['Seal of Vengeance']) {
        this.lastCasted = timeElapsed;
        this.doDamage = { activate: true, seal: 'Seal of Vengeance' }
        return false;
      }
      if (attacker.buffs['Seal of Righteousness']) {
        this.lastCasted = timeElapsed;
        this.doDamage = { activate: true, seal: 'Seal of Vengeance' }
        return false;
      }
      return false;
    }
    return false;
  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    if (this.doDamage && this.doDamage.activate && this.doDamage.seal === 'Seal of Vengeance') {
      this.doDamage.activate=false;
      return this.vengeanceDamage(attacker, defender);
    }
  }

  private vengeanceDamage(attacker: Character, defender: Creature): damageTakenInterface {
    const debuff = defender.debuffs['Seal of Vengeance']
    const debuffStacks = debuff && debuff.stacks ? debuff.stacks : 0
    const damage = (120 * debuffStacks) + (attacker.spellDamage * 0.4286)
    return {
      circumstance: this.name,
      damageAmount: damage,
      damageType: DamageType.holy,
      comment: `Judgement of Vengeance: ${debuffStacks} stacks`
    }
  }
}
