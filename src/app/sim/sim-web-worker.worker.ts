/// <reference lib="webworker" />

import { deserialize } from "typescript-json-serializer";
import { Attack } from "../character/abilities/attack";
import { AvengersShield } from "../character/abilities/avengers-shield";
import { Consecration } from "../character/abilities/consecration";
import { HolyShield } from "../character/abilities/holy-shield";
import { Judgement } from "../character/abilities/judgement";
import { RetributionAura } from "../character/abilities/retribution-aura";
import { SealOfRighteousness } from "../character/abilities/seal-of-righteousness";
import { SealOfVengeance } from "../character/abilities/seal-of-vengeance";
import { Character } from "../character/character";
import { AbilityInterface, BossAbilityInterface, damageTakenInterface } from "../shared/abilityInterface";
import { AttackTableEnum, AttackTable } from "../shared/attack-table";
import { DamageType } from "../shared/magic-school";
import { BossAttack } from "./boss-abilities/boss-attack";
import { Creature } from "./creature";

let lastAutoAttack: any;
let abilities: any;
let registeredAbilities: any;
let onGCD: any;
let character: Character;
let creature: any;
let casting: boolean;
let activeAbilities: Set<string>;
let stopCasting: number = 0;
let buffs: Set<string>
let retributionRank = 0;
let debuffs: Set<string>

addEventListener('message', ({ data }) => {
  activeAbilities = data.activeAbilities;
  buffs = data.buffs;
  debuffs = data.debuffs;
  activeAbilities.forEach(value => {
    const match = value.match(/Retribution Aura - (\d)/)
    if (match && match[1]) {
      retributionRank = +match[1];
      activeAbilities.delete(value);
      activeAbilities.add('Retribution Aura')
    }
  });
  const multipleCombatSessions: SimulationResults[] = new Array();
  for (let k = 0; k < 250; k++) {
    casting = false;
    creature = new Creature();
    character = deserialize(data.character, Character);
    character.additionalStats.spellDamage = 0;
    if (debuffs.has('Judgement of the Crusader')) {
      character.additionalStats.spellDamage += 219
    }
    if (buffs.has('Wrath of Air Totem')) {
      character.additionalStats.spellDamage += 101
    }
    lastAutoAttack = {  // start the fight with an attack and then track the last hit.
      player: 0,
      creature: 0
    }
    abilities = {
      attack: new Attack(),
      SoV: new SealOfVengeance(),
      holyShield: new HolyShield(),
      bossAttack: new BossAttack(),
      consecration: new Consecration(),
      judgement: new Judgement(),
      as: new AvengersShield(),
      SoR: new SealOfRighteousness(),
      retAura: new RetributionAura(retributionRank)
    }
    registeredAbilities = {
      playerAbilities: [abilities.SoR, abilities.as, abilities.attack, abilities.judgement, abilities.SoV, abilities.holyShield, abilities.consecration],
      bossAbilities: [abilities.bossAttack],
      reactiveAbilities: [abilities.holyShield, abilities.retAura]
    }
    onGCD = { value: false, timeUpdated: 0 }
    const results: any[] = [];
    const precastAbilities: AbilityInterface[] = data.precast.map((abilityName: string) => registeredAbilities.playerAbilities.find((ability: AbilityInterface) => ability.name === abilityName));
    precastAbilities.forEach((ability: AbilityInterface, i) => {
      const timeCasted = -1500 * (precastAbilities.length - i)
      if (activeAbilities.has(ability.name)) {
        ability.onCast(character, creature, timeCasted)
      }
    })
    for (let i = precastAbilities.length * -1500; i < 0; i += 10) {
      const result: any = {
        damageTaken: [],
        damageDone: []
      }
      precastAbilities.forEach(ability => {
        if (activeAbilities.has(ability.name)) {
          const onCheckEffect = ability.onCheck(character, creature, i)
          if (onCheckEffect) {
            modifyDamage(character, onCheckEffect)
            determineThreat(character, onCheckEffect);
            result.damageDone.push(onCheckEffect);
          }
        }
      })
      results.push(result);
    }
    for (let i = 0; i < data.timeToRun; i += 10) {
      i <= stopCasting ? casting = false : null
      const result: any = {
        damageTaken: [],
        damageDone: []
      }
      if (onGCD.value === true && onGCD.timeUpdated + 1500 <= i) {
        onGCD.value = false;
        onGCD.timeUpdated = i;
      }
      let rollResult: AttackTableEnum | false = false;
      if (!casting) {
        rollResult = playerAutoAttackCreature(character, creature, i)
        castAllAvailableAbilities(character, creature, i, data);
      }
      registeredAbilities.playerAbilities.forEach((ability: AbilityInterface) => {
        triggerPlayerAbility(rollResult, ability, character, creature, result, i)
      });
      const enemyRollResult: AttackTableEnum | false = creatureAutoAttackPlayer(creature, character, i)
      registeredAbilities.bossAbilities.forEach((ability: BossAbilityInterface) => {
        triggerBossAbility(enemyRollResult, ability, creature, character, result, i)
      });
      registeredAbilities.reactiveAbilities.forEach((ability: AbilityInterface) => {
        triggerReactivePlayerAbility(enemyRollResult, ability, creature, character, result, i)
      });
      results.push(result);
    }
    multipleCombatSessions.push({
      simResults: results,
      runNumber: k
    });
  }
  postMessage(multipleCombatSessions);
});



function castAllAvailableAbilities(character: Character, creature: Creature, i: number, data: any) {
  for (let spellName of data.spellPriority) {
    if (activeAbilities.has(spellName)) {
      const ability: AbilityInterface = registeredAbilities.playerAbilities.find((ability: AbilityInterface) => ability.name === spellName)!;
      if (ability.onGCD && onGCD.value) {
        // DO NOTHING
      } else {
        const triggerGCD = ability.onCast(character, creature, i);
        if (ability.name === 'Avenger\'s Shield') {
          casting = true;
          stopCasting = i + 1000;
        }
        if (triggerGCD) {
          onGCD = { value: true, timeUpdated: i };
        }
      }
    }
  }
}

function triggerReactivePlayerAbility(rollResult: AttackTableEnum | false, ability: AbilityInterface, attacker: Creature, defender: Character, result: any, timeElapsed: number) {
  if (rollResult && activeAbilities.has(ability.name)) {
    // if (rollResult) {
    const onHitEffect = ability.onReactive!(rollResult, attacker, defender, timeElapsed);
    if (onHitEffect) {
      modifyDamage(defender, onHitEffect)
      determineThreat(defender, onHitEffect);
      result.damageDone.push(onHitEffect);
    }
  }
}

function triggerPlayerAbility(rollResult: AttackTableEnum | false, ability: AbilityInterface, attacker: Character, defender: Creature, result: any, timeElapsed: number) {
  if (activeAbilities.has(ability.name)) {
    if (rollResult) {
      const onHitEffect = ability.onHit(rollResult, attacker, defender, timeElapsed);
      if (onHitEffect) {
        modifyDamage(attacker, onHitEffect)
        determineThreat(attacker, onHitEffect);
        result.damageDone.push(onHitEffect);
      }
    }
    const onCheckEffect = ability.onCheck(attacker, defender, timeElapsed)
    if (onCheckEffect) {
      modifyDamage(attacker, onCheckEffect)
      determineThreat(attacker, onCheckEffect);
      result.damageDone.push(onCheckEffect);
    }
  }
}

function triggerBossAbility(rollResult: AttackTableEnum | false, ability: BossAbilityInterface, attacker: Creature, defender: Character, result: any, timeElapsed: number) {
  if (rollResult) {
    const onHitEffect = ability.onHit(rollResult, attacker, defender);
    onHitEffect ? result.damageTaken.push(onHitEffect) : null;
  }
  const onCheckEffect = ability.onCheck(attacker, defender, timeElapsed)
  onCheckEffect ? result.damageTaken.push(onCheckEffect) : null;
}

function playerAutoAttackCreature(character: Character, creature: Creature, timeElapsed: number): AttackTableEnum | false {
  const weaponSpeed = character.attackSpeed;
  if (shouldAttack(weaponSpeed, timeElapsed, lastAutoAttack.player, 'player')) {
    const rollResult = attackRoll(character.attackTable)
    lastAutoAttack.player = timeElapsed;
    return rollResult
  } else {
    return false;
  }
}

function creatureAutoAttackPlayer(creature: Creature, character: Character, timeElapsed: number): AttackTableEnum | false {
  const weaponSpeed = creature.attackSpeed;
  if (shouldAttack(weaponSpeed, timeElapsed, lastAutoAttack.creature, 'creature')) {
    const attackTable: AttackTable = {
      miss: creature.AttackTable[AttackTableEnum.miss] + character.missChance,
      dodge: creature.AttackTable[AttackTableEnum.dodge] + character.dodgeChance,
      parry: creature.AttackTable[AttackTableEnum.parry] + character.parry,
      glancing: 0,
      block: creature.AttackTable[AttackTableEnum.block] + character.blockChance + (
        (character.buffs['Holy Shield'] && character.buffs['Holy Shield'].charges > 0) ? 30 : 0),
      crit: creature.AttackTable[AttackTableEnum.crit] - character.critReduction,
      crushing: creature.AttackTable[AttackTableEnum.crushing],
      hit: 0
    }
    const rollResult = attackRoll(attackTable)
    lastAutoAttack.creature = timeElapsed;
    return rollResult
  } else {
    return false;
  }
}

function attackRoll(attackTable: AttackTable): AttackTableEnum {
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

function shouldAttack(attackSpeed: number, timeElapsed: number, lastAttackTime: number, attacker: string): boolean {
  const attack = (lastAttackTime + (attackSpeed * 1000) <= timeElapsed)
  if (attack) {
    if (attacker === 'player') {
      lastAutoAttack.player = timeElapsed;
    } else {
      lastAutoAttack.creature = timeElapsed;
    }
  }
  return attack;
}

function modifyDamage(character: Character, damage: damageTakenInterface) {
  if (damage.damageType === DamageType.holy) {
    if (buffs.has('Sanctity Aura - 0')) {
      damage.damageAmount = damage.damageAmount * 1.10
    } else if (buffs.has('Sanctity Aura - 1')) {
      damage.damageAmount = damage.damageAmount * 1.11
    } else if (buffs.has('Sanctity Aura - 2')) {
      damage.damageAmount = damage.damageAmount * 1.12
    }
    if (debuffs.has('Misery')) {
      damage.damageAmount = damage.damageAmount * 1.05;
    }
  }
  if (character.spec.talents.oneHandedSpec > 0) {
    damage.damageAmount = damage.damageAmount * (1 + (character.spec.talents.oneHandedSpec / 100))
  }
  if (character.spec.talents.crusade > 0) {
    damage.damageAmount = damage.damageAmount * (1 + (character.spec.talents.crusade / 100))
  }
  damage.damageAmount = Math.round(damage.damageAmount);
}

function determineThreat(character: Character, combatResults: damageTakenInterface): void {
  let totalThreat = combatResults.damageAmount;
  let holythreatModifier = 0.6;
  const improvedRighteousFuryTalents = character.spec.talents.improvedRighteousFury;
  if (improvedRighteousFuryTalents && improvedRighteousFuryTalents > 0) {
    improvedRighteousFuryTalents === 1 ? holythreatModifier = holythreatModifier * 1.16 : null;
    improvedRighteousFuryTalents === 2 ? holythreatModifier = holythreatModifier * 1.33 : null;
    improvedRighteousFuryTalents === 3 ? holythreatModifier = holythreatModifier * 1.50 : null;
  }
  if (combatResults.damageType === DamageType.holy) {
    totalThreat = totalThreat * (1 + holythreatModifier);
  }
  if (combatResults.circumstance === 'Holy Shield') {
    totalThreat = totalThreat * 1.35
  }
  combatResults.threat = totalThreat;
}

interface TimeSlotResults {
  damageDone: damageTakenInterface[],
  damageTaken: damageTakenInterface[]
}

interface SimulationResults {
  runNumber: number;
  simResults: TimeSlotResults[]
}
