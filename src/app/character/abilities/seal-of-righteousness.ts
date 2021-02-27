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
  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    return false;
  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
  }
}
