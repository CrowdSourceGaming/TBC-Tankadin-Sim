import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class RetributionAura implements AbilityInterface {
  magicSchool: DamageType = DamageType.holy;
  name: string = 'Retribution Aura'
  onGCD: boolean = true;
  internalCD: number = 0;
  rank: number;

  constructor(rank: number) {
    this.rank = rank;
  }

  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    throw new Error("Method not implemented.");
  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    return false;
  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
    throw new Error("Method not implemented.");
  }
  onReactive(rollResult: AttackTableEnum, attacker: Creature, defender: Character, timeElapsed: number): damageTakenInterface | void {
    if ([AttackTableEnum.hit, AttackTableEnum.crit, AttackTableEnum.crushing, AttackTableEnum.block].includes(rollResult)) {
      const damage = 26 * (1 + (.25 * this.rank))
      return {
        circumstance: this.name,
        damageAmount: damage,
        damageType: DamageType.holy
      }
    }
  }
}
