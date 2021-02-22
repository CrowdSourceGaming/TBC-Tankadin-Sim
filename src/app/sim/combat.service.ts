import { Injectable } from '@angular/core';
import { Attack } from '../character/abilities/attack';
import { HolyShield } from '../character/abilities/holy-shield';
import { SealOfVengeance } from '../character/abilities/seal-of-vengeance';
import { Character } from '../character/character';
import { AbilityInterface, damageTakenInterface, BossAbilityInterface } from '../shared/abilityInterface';
import { AttackTable, AttackTableEnum } from '../shared/attack-table';
import { DamageType } from '../shared/magic-school';
import { BossAttack } from './boss-abilities/boss-attack';
import { Creature } from './creature';

@Injectable({
  providedIn: 'root'
})
export class CombatService {

  playerDamageTaken = [];
  creatureDamageTaken = [];

  spellPriority = ['Holy Shield', 'Seal of Vengeance']
  onGCD = { value: false, timeUpdated: 0 };

  lastAutoAttack!: { player: number; creature: number; };

  registeredAbilities!: registeredAbilitiesInterface;

  startTime!: number;

  constructor() { }

  startCombat(character: Character, creature: Creature, timeToRun: number): TimeSlotResults[] {
    this.lastAutoAttack = {  // start the fight with an attack and then track the last hit.
      player: -99999999999,
      creature: -99999999999
    }
    this.registeredAbilities = {
      playerAbiliities: [new Attack(), new SealOfVengeance(), new HolyShield()],
      bossAbilities: [new BossAttack()]
    }
    this.onGCD = { value: false, timeUpdated: 0 }
    this.startTime = Date.now();
    const results: TimeSlotResults[] = [];
    for (let i = 0; i < timeToRun; i += 10) {
      const result: TimeSlotResults = {
        damageTaken: [],
        damageDone: []
      }
      if (this.onGCD.value === true && this.onGCD.timeUpdated + 1500 <= i) {
        this.onGCD.value = false;
        this.onGCD.timeUpdated = i;
      }
      const rollResult: AttackTableEnum | false = this.playerAutoAttackCreature(character, creature, i)
      this.castAllAvailableAbilities(character, creature, i);
      this.registeredAbilities.playerAbiliities.forEach((ability: AbilityInterface) => {
        this.triggerPlayerAbility(rollResult, ability, character, creature, result, i)
      });
      const enemyRollResult: AttackTableEnum | false = this.creatureAutoAttackPlayer(creature, character, i)
      this.registeredAbilities.bossAbilities.forEach((ability: BossAbilityInterface) => {
        this.triggerBossAbility(enemyRollResult, ability, creature, character, result, i)
      });
      results.push(result);
    }
    return results;
  }

  private castAllAvailableAbilities(character: Character, creature: Creature, i: number) {
    for (let spellName of this.spellPriority) {
      const ability = this.registeredAbilities.playerAbiliities.find(ability => ability.name === spellName)!;
      if (ability.onGCD && this.onGCD.value) {
        // DO NOTHING
      } else {
        const triggerGCD = ability.onCast(character, creature, i);
        if (triggerGCD) {
          this.onGCD = { value: true, timeUpdated: i };
        }
      }
    }
  }

  private triggerPlayerAbility(rollResult: AttackTableEnum | false, ability: AbilityInterface, attacker: Character, defender: Creature, result: TimeSlotResults, timeElapsed: number) {
    if (rollResult) {
      const onHitEffect = ability.onHit(rollResult, attacker, defender, timeElapsed);
      if (onHitEffect) {
        this.modifyDamage(attacker, onHitEffect)
        result.damageDone.push(onHitEffect);
      }
    }
    const onCheckEffect = ability.onCheck(attacker, defender, timeElapsed)
    if (onCheckEffect) {
      this.modifyDamage(attacker, onCheckEffect)
      result.damageDone.push(onCheckEffect);
    }
  }

  private triggerBossAbility(rollResult: AttackTableEnum | false, ability: BossAbilityInterface, attacker: Creature, defender: Character, result: TimeSlotResults, timeElapsed: number) {
    if (rollResult) {
      const onHitEffect = ability.onHit(rollResult, attacker, defender);
      onHitEffect ? result.damageTaken.push(onHitEffect) : null;
    }
    const onCheckEffect = ability.onCheck(attacker, defender, timeElapsed)
    onCheckEffect ? result.damageTaken.push(onCheckEffect) : null;
  }

  private playerAutoAttackCreature(character: Character, creature: Creature, timeElapsed: number): AttackTableEnum | false {
    const weaponSpeed = character.attackSpeed;
    if (this.shouldAttack(weaponSpeed, timeElapsed, this.lastAutoAttack.player, 'player')) {
      const rollResult = this.attackRoll(character.attackTable)
      this.lastAutoAttack.player = timeElapsed;
      return rollResult
    } else {
      return false;
    }
  }

  private creatureAutoAttackPlayer(creature: Creature, character: Character, timeElapsed: number): AttackTableEnum | false {
    const weaponSpeed = creature.attackSpeed;
    if (this.shouldAttack(weaponSpeed, timeElapsed, this.lastAutoAttack.creature, 'creature')) {
      const attackTable: AttackTable = {
        miss: creature.AttackTable[AttackTableEnum.miss] + character.missChance,
        dodge: creature.AttackTable[AttackTableEnum.dodge] + character.dodgeChance,
        parry: creature.AttackTable[AttackTableEnum.parry] + character.parry,
        glancing: 0,
        block: creature.AttackTable[AttackTableEnum.block] + character.blockChance,
        crit: creature.AttackTable[AttackTableEnum.crit] - character.critReduction,
        crushing: creature.AttackTable[AttackTableEnum.crushing],
        hit: 0
      }
      const rollResult = this.attackRoll(attackTable)
      this.lastAutoAttack.creature = timeElapsed;
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

  private modifyDamage(character: Character, damage: damageTakenInterface) {
    if (damage.damageType === DamageType.holy) {
      if (character.buffs['Sanctity Aura'] || character.buffs['Improved Sanctity Aura']) {
        damage.damageAmount = damage.damageAmount * 1.10
      }
    }
    if (character.buffs['Improved Sanctity Aura']) {
      damage.damageAmount = damage.damageAmount * 1.02
    }
    if (character.spec.talents.oneHandedSpec > 0) {
      damage.damageAmount = damage.damageAmount * (1 + (character.spec.talents.oneHandedSpec / 100))
    }
    if (character.spec.talents.crusade > 0) {
      damage.damageAmount = damage.damageAmount * (1 + (character.spec.talents.crusade / 100))
    }
    damage.damageAmount = Math.round(damage.damageAmount);
  }
}





export interface TimeSlotResults {
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
  bossAbilities: BossAbilityInterface[]
}


