import { TestBed } from '@angular/core/testing';
import { Attack } from '../character/abilities/attack';
import { Character } from '../character/character';
import { AttackTableEnum } from '../shared/attack-table';
import { DamageType } from '../shared/magic-school';

import { CombatService } from './combat.service';
import { Creature } from './creature';

describe('CombatService', () => {
  let service: CombatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('attackRoll', () => {
    describe('character attacking creature', () => {
      beforeEach(() => {
        service.registeredAbilities.playerAbiliities.push(new Attack());
      })
      afterEach(() => {
        service.registeredAbilities.playerAbiliities = [];
      })
      let randomRollSpy: jasmine.Spy;
      it('should return a miss', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.01);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(true).toBeTruthy();
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 0, circumstance: AttackTableEnum.miss }
        );
      })
      it('should return a miss', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.09);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 0, circumstance: AttackTableEnum.miss }
        );
      })
      it('should return a dodge', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.091);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 0, circumstance: AttackTableEnum.dodge }
        );
      })
      it('should return a dodge', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.155);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 0, circumstance: AttackTableEnum.dodge }
        );
      })
      it('should return a parry', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.156);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 0, circumstance: AttackTableEnum.parry }
        );
      })
      it('should return a parry', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.295);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 0, circumstance: AttackTableEnum.parry }
        );
      })
      it('should return a glance', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.296);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 3, circumstance: AttackTableEnum.glancing }
        );
      })
      it('should return a glance', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.544);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 4, circumstance: AttackTableEnum.glancing }
        );
      })
      it('should return a crit', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.546);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 12, circumstance: AttackTableEnum.crit }
        );
      })
      it('should return a hit', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.845);
        const results = service.startCombat(new Character(), new Creature(), 2)
        expect(results[0].damageDone).toContain(
          { damageType: DamageType.physical, damageAmount: 7, circumstance: AttackTableEnum.hit }
        );
      })
      it('should attack every 2 seconds for 2 minutes', () => {
        randomRollSpy = spyOn(Math, 'random').and.returnValue(0.845);
        const minutes = 2;
        const secondsPerMinute = 60
        const msPerSecond = 1000;
        const attacksPerSecond = 0.5
        const results = service.startCombat(new Character(), new Creature(), minutes * secondsPerMinute * msPerSecond)
        expect(results.length).toEqual(minutes * secondsPerMinute * msPerSecond / 10);
        const autoAttackResults = results.filter(timeArray => timeArray.damageDone.find(damage => damage.damageType === DamageType.physical))
        expect(autoAttackResults.length).toEqual(minutes * secondsPerMinute * attacksPerSecond)
        for (let result of autoAttackResults) {
          if (result) {
            expect(result.damageDone).toContain({ damageType: DamageType.physical, damageAmount: 7, circumstance: AttackTableEnum.hit });
          } else {
            // console.log('void');
          }
        }
      })
    })
  })
});
