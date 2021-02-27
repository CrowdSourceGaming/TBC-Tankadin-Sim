import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SaveService } from '../save.service';
import { damageTakenInterface } from '../shared/abilityInterface';
import { SharedDataService } from '../shared/shared-data.service';
import { Creature } from './creature';

@Injectable({
  providedIn: 'root'
})
export class CombatService {
  combatResults: BehaviorSubject<SimResults[]> = new BehaviorSubject(new Array());
  openingBurstResults: BehaviorSubject<Array<TimeSlotResults[]>> = new BehaviorSubject(new Array());
  precast = ['Seal of Vengeance', 'Avenger\'s Shield']
  spellPriority = ['Holy Shield', 'Avenger\'s Shield', 'Judgement', 'Consecration', 'Seal of Vengeance', 'Seal of Righteousness']
  activeAbilities = new Set(['Attack', 'Holy Shield', 'Avenger\'s Shield', 'Judgement', 'Consecration', 'Seal of Vengeance'])

  pool: Worker[] = new Array();
  webWorker: Worker;

  constructor(private sharedDataService: SharedDataService) {
    this.webWorker = new Worker('./sim-web-worker.worker.ts', { type: `module` })
  }

  BURST_SECONDS = 10;
  BURST_COUNT = ((this.BURST_SECONDS * 1000) + (this.precast.length * 1500)) / 10;
  FULL_DURATION_SECONDS = ((120 * 1000) + (this.precast.length * 1500)) / 10;

  startCombat(timeToRun: number): void {
    this.FULL_DURATION_SECONDS = timeToRun / 1000;
    console.log('starting combat simulation');
    const startTime = new Date();
    const character = this.sharedDataService.character.value;
    this.webWorker.onmessage = ((result: MessageEvent<SimResults[]>) => {
      this.combatResults.next(result.data);
      console.log('finished combat simulation in ', new Date().getTime() - startTime.getTime(), ' ms');
    })
    this.webWorker.postMessage({ character: character, activeAbilities: this.activeAbilities, spellPriority: this.spellPriority, precast: this.precast, timeToRun: timeToRun })
  }

  sortForDamage(fullRunValues: SimResults[], burst: boolean): SimResults[] {
    return fullRunValues.sort((a, b) => this.totalDamageForRun(a, burst) - this.totalDamageForRun(b, burst));
  }

  sortForThreat(fullRunValues: SimResults[], burst: boolean): SimResults[] {
    return fullRunValues.sort((a, b) => this.totalThreatForRun(a, burst) - this.totalThreatForRun(b, burst));
  }

  totalDamageForRun(run: SimResults, burst: boolean) {
    if (burst) {
      return run.simResults.slice(0, this.BURST_COUNT).reduce((a, b) => a + b.damageDone.reduce((c, d) => c + d.damageAmount, 0), 0)
    }
    return run.simResults.reduce((a, b) => a + b.damageDone.reduce((c, d) => c + d.damageAmount, 0), 0)
  }

  totalThreatForRun(run: SimResults, burst: boolean) {
    if (burst) {
      return run.simResults.slice(0, this.BURST_COUNT).reduce((a, b) => a + b.damageDone.reduce((c, d) => c + (d.threat || 0), 0), 0)
    }
    return run.simResults.reduce((a, b) => a + b.damageDone.reduce((c, d) => c + (d.threat || 0), 0), 0)
  }

  tpsForRun(run: SimResults, burst: boolean) {
    return this.totalThreatForRun(run, burst) / (burst ? this.BURST_SECONDS : this.FULL_DURATION_SECONDS)
  }

  dpsForRun(run: SimResults, burst: boolean) {
    return this.totalDamageForRun(run, burst) / (burst ? this.BURST_SECONDS : this.FULL_DURATION_SECONDS)
  }
}


export interface SimResults {
  runNumber: number,
  simResults: TimeSlotResults[]
}


export interface TimeSlotResults {
  damageDone: damageTakenInterface[],
  damageTaken: damageTakenInterface[]
}
