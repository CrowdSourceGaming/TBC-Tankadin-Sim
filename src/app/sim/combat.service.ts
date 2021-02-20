import { Injectable } from '@angular/core';
import { Ability } from '../character/abilities/ability';
import { Character } from '../character/character';
import { AbilityInterface, damageTakenInterface } from '../shared/abilityInterface';
import { AttackTable, AttackTableEnum } from '../shared/attack-table';
import { DamageType } from '../shared/magic-school';
import { Creature } from './creature';

@Injectable({
  providedIn: 'root'
})
export class CombatService {

  playerDamageTaken = [];
  creatureDamageTaken = [];

  lastAutoAttack = {  // start the fight with an attack and then track the last hit.
    player: -99999999999,
    creature: -99999999999
  }

  registeredAbilities: registeredAbilitiesInterface = {
    playerAbiliities: [], bossAbilities: []
  }

  startTime!: number;

  constructor() { }

  startCombat(character: Character, creature: Creature, timeToRun: number): timeSlotResults[] {
    this.startTime = Date.now();
    const results: timeSlotResults[] = [];
    for (let i = 0; i < timeToRun; i += 10) {
      const result: timeSlotResults = {
        damageTaken: [],
        damageDone: []
      }
      const rollResult: AttackTableEnum | false = this.playerAutoAttackCreature(character, creature, i)
      this.registeredAbilities.playerAbiliities.forEach((ability: AbilityInterface) => {
        this.triggerAbility(rollResult, ability, character, creature, result, i)
      });
      results.push(result);
    }
    return results;
  }

  private triggerAbility(rollResult: AttackTableEnum | false, ability: AbilityInterface, attacker: Character, defender: Creature, result: timeSlotResults, timeElapsed: number) {
    if (rollResult) {
      const onHitEffect = ability.onHit(rollResult, attacker, defender);
      onHitEffect ? result.damageDone.push(onHitEffect) : null;
    }
    const onCastEffect = ability.onCast(attacker, defender)
    onCastEffect ? result.damageDone.push(onCastEffect) : null;
    const onCheckEffect = ability.onCheck(attacker, defender, timeElapsed)
    onCheckEffect ? result.damageDone.push(onCheckEffect) : null;
  }

  private playerAutoAttackCreature(character: Character, creature: Creature, timeElapsed: number): AttackTableEnum | false {
    const weaponSpeed = character.attackSpeed;
    if (this.shouldAttack(weaponSpeed, timeElapsed, this.lastAutoAttack.player, 'player')) {
      const rollResult = this.attackRoll(character.attackTable)
      return rollResult
    } else {
      return false;
    }
  }

  private attackRoll(attackTable: AttackTable): AttackTableEnum {
    let roll = Math.random() * 100
    for (let attackOutcome of Object.keys(attackTable)) {
      const rollRange = attackTable[attackOutcome as keyof typeof attackTable]
      if (roll <= rollRange) {
        return AttackTableEnum[attackOutcome as keyof typeof AttackTableEnum];
      } else {
        roll -= rollRange
      }
    };
    return AttackTableEnum.hit;
  }

  private shouldAttack(attackSpeed: number, timeElapsed: number, lastAttackTime: number, attacker: string): boolean {
    const attack = (lastAttackTime + (attackSpeed * 1000) <= timeElapsed)
    if (attack) {
      if (attacker === 'player') {
        this.lastAutoAttack.player = timeElapsed;
      } else {
        this.lastAutoAttack.creature = timeElapsed;
      }
    }
    return attack;
  }
}





interface timeSlotResults {
  damageDone: damageTakenInterface[],
  damageTaken: damageTakenInterface[]
}

enum AvoidableBy {
  block = "block",
  parry = "parry",
  miss = "miss",
  dodge = "dodge",
  resist = "resist"
}

interface registeredAbilitiesInterface {
  playerAbiliities: AbilityInterface[],
  bossAbilities: AbilityInterface[]
}


