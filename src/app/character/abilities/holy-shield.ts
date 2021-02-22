import { AbilityInterface, damageTakenInterface } from "src/app/shared/abilityInterface";
import { AttackTableEnum } from "src/app/shared/attack-table";
import { DamageType } from "src/app/shared/magic-school";
import { Creature } from "src/app/sim/creature";
import { Character } from "../character";

export class HolyShield implements AbilityInterface {

  magicSchool: DamageType;
  name: string;
  onGCD: boolean;
  internalCD: number;
  lastCastTime: number;

  constructor() {
    this.name = 'Holy Shield';
    this.onGCD = true;
    this.magicSchool = DamageType.holy;
    this.internalCD = 10000
    this.lastCastTime = -9999999999
  }

  onHit(rollResult: AttackTableEnum, attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
  }
  onCast(attacker: Character, defender: Creature, timeElapsed: number): boolean {
    if (attacker.spec.talents.holyShield && this.lastCastTime + this.internalCD <= timeElapsed) {
      let charges = 4
      charges += attacker.spec.talents.improvedHolyShield * 2
      console.log(`${timeElapsed} - casted: ${this.name} with ${charges} charges`)
      attacker.buffs[this.name] = { charges: charges, expires: timeElapsed + 10000 }
      this.lastCastTime = timeElapsed;
      return true;
    }
    return false;
  }
  onCheck(attacker: Character, defender: Creature, timeElapsed: number): void | damageTakenInterface {
  }
}
