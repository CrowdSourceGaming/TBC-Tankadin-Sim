import { AttackTableEnum } from 'src/app/shared/attack-table';
import { Creature } from 'src/app/sim/creature';
import { Character } from '../character';
import { Races } from '../races/race';
import { SealOfVengeance } from './seal-of-vengeance';

describe('SealOfVengeance', () => {
  it('should create an instance', () => {
    expect(new SealOfVengeance()).toBeTruthy();
  });

  let attacker: Character;
  let defender: Creature;
  let SoV: SealOfVengeance;
  beforeEach(() => {
    attacker = new Character(Races.human)
    defender = new Creature();
    SoV = new SealOfVengeance();
  })
  describe('onHit', () => {
    beforeEach(() => {
      attacker.buffs[SoV.name] = { active: true, expires: 30000 }
    })
    describe('success', () => {
      it('should apply a stack on attack', () => {
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
        spyOn(Math, 'random').and.returnValue(0.01);
        SoV.onHit(AttackTableEnum.hit, attacker, defender, 0);
        expect(defender.debuffs['Seal of Vengeance'].stacks).toEqual(1);
      })
      it('should apply a stack on attack when i have a stack already', () => {
        defender.debuffs = { 'Seal of Vengeance': { stacks: 1, lastDamageAppliedTimestamp: -9999999999 } }
        spyOn(Math, 'random').and.returnValue(0.01);
        SoV.onHit(AttackTableEnum.crit, attacker, defender,0);
        expect(defender.debuffs['Seal of Vengeance'].stacks).toEqual(2);
      })
      it('should not let me go over 5 stacks', () => {
        defender.debuffs = { 'Seal of Vengeance': { stacks: 5, lastDamageAppliedTimestamp: -9999999999 } }
        spyOn(Math, 'random').and.returnValue(0.01);
        SoV.onHit(AttackTableEnum.glancing, attacker, defender,0);
        expect(defender.debuffs['Seal of Vengeance'].stacks).toEqual(5);
      })
      it('will only apply if attack has the SoV buff', () => {
        attacker.buffs[SoV.name] = { active: false, expires: 30000 }
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
        spyOn(Math, 'random').and.returnValue(0.01);
        SoV.onHit(AttackTableEnum.hit, attacker, defender, 0);
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
      })
    })
    describe('melee attack failed', () => {
      it('should apply not stack on attack', () => {
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
        spyOn(Math, 'random').and.returnValue(0.01);
        SoV.onHit(AttackTableEnum.miss, attacker, defender,0);
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
      })
      it('should apply not stack on attack', () => {
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
        spyOn(Math, 'random').and.returnValue(0.01);
        SoV.onHit(AttackTableEnum.dodge, attacker, defender,0);
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
      })
      it('should apply not stack on attack', () => {
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
        spyOn(Math, 'random').and.returnValue(0.01);
        SoV.onHit(AttackTableEnum.parry, attacker, defender,0);
        expect(defender.debuffs['Seal of Vengeance']).toBeUndefined();
      })
    })
  })
  describe('onCheck', () => {
    it('should do damage if it has been more than 3 seconds', () => {
      console.log('a')
      defender.debuffs = { 'Seal of Vengeance': { stacks: 1, lastDamageAppliedTimestamp: -9999999999 } }
      const damage = SoV.onCheck(attacker, defender, 5000);
      expect(JSON.stringify(damage)).toEqual(JSON.stringify({
        circumstance: 'SoV Dot',
        damageAmount: 150 / 5,
        damageType: SoV.magicSchool
      }))
    })
    it('should do damage with multiple stacks if it has been more than 3 seconds', () => {
      console.log('a')
      defender.debuffs = { 'Seal of Vengeance': { stacks: 5, lastDamageAppliedTimestamp: -9999999999 } }
      const damage = SoV.onCheck(attacker, defender, 5000);
      expect(JSON.stringify(damage)).toEqual(JSON.stringify({
        circumstance: 'SoV Dot',
        damageAmount: 150 / 5 * 5,
        damageType: SoV.magicSchool
      }))
    })
    it('should incorporate spell damage', () => {
      console.log('a')
      defender.debuffs = { 'Seal of Vengeance': { stacks: 5, lastDamageAppliedTimestamp: -9999999999 } }
      attacker.gear.back.stats.spellDamage = 340
      const damage = SoV.onCheck(attacker, defender, 5000);
      expect(JSON.stringify(damage)).toEqual(JSON.stringify({
        circumstance: 'SoV Dot',
        damageAmount: 161.56,
        damageType: SoV.magicSchool
      }))
    })
  })
});
