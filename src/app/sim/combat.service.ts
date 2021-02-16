import { Injectable } from '@angular/core';
import { Character } from '../character/character';
import { AttackTable } from '../shared/attack-table';
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

  startTime!: number;

  constructor() { }

  startCombat(character: Character, creature: Creature) {
    this.startTime = Date.now();
    const twoMinutesInMS = 2 * 60 * 1000
    for (let i = 0; i < twoMinutesInMS; i += 10) {
      this.playerAutoAttackCreature(character, creature, i)
      // creatureAutoAttackPlayer(creature, character);
      // playerAbility()
      // creatureAbility();
      // playerEnviornmentDamage();
      // creatureEnvironmentDamage();
    }
  }

  private playerAutoAttackCreature(character: Character, creature: Creature, timeElapsed: number) {
    const weaponSpeed = character.gear.mainHand.stats.attackSpeed!;
    if (shouldAttack(weaponSpeed, timeElapsed, this.lastAutoAttack.player)) {
      const attackTable = character.attackTable
      const result = attackRoll(attackTable)
      rollDamage(character.weaponDamageMin, character.weaponDamageMax, creature)
    }
    if (character)
  }
}

const shouldAttack = (attackSpeed: number, timeElapsed: number, lastAttackTime: number) => {
  return (lastAttackTime + (attackSpeed * 1000) <= timeElapsed)
}

const attackRoll = (attackTable) => {
  Math.round
}

const rollDamage = (damageMin: number, damageMax: number, defender: Creature | Character) => {
  const rawDamage = Math.floor(Math.random() * (damageMax - damageMin + 1) + damageMin);
  const armorReduction = defender.armor / (defender.armor - 22167.5 + 467.5 * defender.level)
}

interface damageTakenInterface {
  damageAmount: number
  damageType: DamageType
  circumstance: string
}

interface actionsInterface {
  interval: number //time in miliseconds
  damage: number
  magicSchool: DamageType
}

enum AvoidableBy {
  block = "block",
  parry = "parry",
  miss = "miss",
  dodge = "dodge",
  resist = "resist"
}


