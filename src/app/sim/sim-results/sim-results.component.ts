import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { damageTakenInterface } from 'src/app/shared/abilityInterface';
import { DamageType } from 'src/app/shared/magic-school';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { CombatService, TimeSlotResults } from '../combat.service';

@Component({
  selector: 'app-sim-results',
  templateUrl: './sim-results.component.html',
  styleUrls: ['./sim-results.component.scss']
})
export class SimResultsComponent implements OnInit {

  showGraph: boolean = false;

  dataSource: MatTableDataSource<SimResultsGraphInterface> = new MatTableDataSource(new Array());

  constructor(private combatService: CombatService, private sharedDataService: SharedDataService) { }

  BURST_mSECONDS = 10000 / 10;
  BURST_SECONDS = 10;
  FULL_DURATION_SECONDS = 120

  // BurstArray: DamageThreatInterface[] = new Array()
  // fullArray: DamageThreatInterface[] = new Array()

  ngOnInit(): void {
    this.combatService.combatResults.subscribe((combatResults: TimeSlotResults[][]) => {
      if (combatResults[0]) {
        const [multiRunBustArray, multiRunFullArray] = this.determineDamageAndThreat(combatResults);
        const burstValues = this.totalEachRun(multiRunBustArray);
        const fullRunValues = this.totalEachRun(multiRunFullArray);
        const dataTable = this.translateDataToTable(burstValues, fullRunValues);
        this.dataSource.data = dataTable;
      }
    })
  }

  private translateDataToTable(burstValues: DamageThreatInterface[], fullRunValues: DamageThreatInterface[]): SimResultsGraphInterface[] {
    const onePercentLowIndex = Math.floor(burstValues.length / 99);
    const fivePercentLowIndex = Math.floor(burstValues.length / 95);
    return [{
      name: 'DPS',
      "15 second average": Math.round(burstValues.reduce((a, b) => a + b.damage, 0) / burstValues.length / this.BURST_SECONDS),
      "15 seconds 1% low": Math.round(burstValues.sort((a, b) => a.damage - b.damage)[onePercentLowIndex].damage / this.BURST_SECONDS),
      "15 seconds 5% low": Math.round(burstValues.sort((a, b) => a.damage - b.damage)[fivePercentLowIndex].damage / this.BURST_SECONDS),
      "15 seconds min": Math.round(Math.min(...burstValues.map(v => v.damage)) / this.BURST_SECONDS),
      "15 second max": Math.round(Math.max(...burstValues.map(v => v.damage)) / this.BURST_SECONDS),
      "2 minute average": Math.round(fullRunValues.reduce((a, b) => a + b.damage, 0) / fullRunValues.length / this.FULL_DURATION_SECONDS),
      "2 minute 1% low": Math.round(fullRunValues.sort((a, b) => a.damage - b.damage)[onePercentLowIndex].damage / this.FULL_DURATION_SECONDS),
      "2 minute 5% low": Math.round(fullRunValues.sort((a, b) => a.damage - b.damage)[fivePercentLowIndex].damage / this.FULL_DURATION_SECONDS),
      "2 minute min": Math.round(Math.min(...fullRunValues.map(v => v.damage)) / this.FULL_DURATION_SECONDS),
      "2 minute max": Math.round(Math.max(...fullRunValues.map(v => v.damage)) / this.FULL_DURATION_SECONDS)
    },
    {
      name: 'TPS',
      "15 second average": Math.round(burstValues.reduce((a, b) => a + b.threat, 0) / burstValues.length / this.BURST_SECONDS),
      "15 seconds 1% low": Math.round(burstValues.sort((a, b) => a.threat - b.threat)[onePercentLowIndex].threat / this.BURST_SECONDS),
      "15 seconds 5% low": Math.round(burstValues.sort((a, b) => a.threat - b.threat)[fivePercentLowIndex].threat / this.BURST_SECONDS),
      "15 seconds min": Math.round(Math.min(...burstValues.map(v => v.threat)) / this.BURST_SECONDS),
      "15 second max":Math.round( Math.max(...burstValues.map(v => v.threat)) / this.BURST_SECONDS),
      "2 minute average": Math.round(fullRunValues.reduce((a, b) => a + b.threat, 0) / fullRunValues.length / this.FULL_DURATION_SECONDS),
      "2 minute 1% low": Math.round(fullRunValues.sort((a, b) => a.threat - b.threat)[onePercentLowIndex].threat / this.FULL_DURATION_SECONDS),
      "2 minute 5% low": Math.round(fullRunValues.sort((a, b) => a.threat - b.threat)[fivePercentLowIndex].threat / this.FULL_DURATION_SECONDS),
      "2 minute min": Math.round(Math.min(...fullRunValues.map(v => v.threat)) / this.FULL_DURATION_SECONDS),
      "2 minute max": Math.round(Math.max(...fullRunValues.map(v => v.threat)) / this.FULL_DURATION_SECONDS)
    }]
  }

  private totalEachRun(array: DamageThreatInterface[][]): DamageThreatInterface[] {
    return array.map(run => {
      return {
        damage: run.reduce((a, b) => a + b.damage, 0),
        threat: run.reduce((a, b) => a + b.threat, 0),
      };
    })
  }

  private determineDamageAndThreat(combatResults: TimeSlotResults[][]) {
    const multiRunBustArray: DamageThreatInterface[][] = new Array();
    const multiRunFullArray: DamageThreatInterface[][] = new Array();
    combatResults.forEach((combatSession: TimeSlotResults[]) => {
      const burstArray: DamageThreatInterface[] = new Array();
      const fullArray: DamageThreatInterface[] = new Array();
      combatSession.forEach((combatTimeSlice: TimeSlotResults, index: number) => {
        combatTimeSlice.damageDone.forEach((damageDone: damageTakenInterface) => {
          const result: DamageThreatInterface = {
            damage: damageDone.damageAmount,
            threat: this.determineThreat(damageDone)
          }
          if (index <= this.BURST_mSECONDS) {
            burstArray.push(result)
          };
          fullArray.push(result);
        })
      })
      multiRunBustArray.push(burstArray);
      multiRunFullArray.push(fullArray);
    })
    return [multiRunBustArray, multiRunFullArray];
  }

  private determineThreat(combatResults: damageTakenInterface): number {
    const character = this.sharedDataService.character.value;
    let holythreatModifier = 0.6;
    const improvedRighteousFuryTalents = character.spec.talents.improvedRighteousFury;
    if (improvedRighteousFuryTalents && improvedRighteousFuryTalents > 0) {
      improvedRighteousFuryTalents === 1 ? holythreatModifier = holythreatModifier * 1.16 : null;
      improvedRighteousFuryTalents === 2 ? holythreatModifier = holythreatModifier * 1.33 : null;
      improvedRighteousFuryTalents === 3 ? holythreatModifier = holythreatModifier * 1.50 : null;
    }
    let totalThreat = combatResults.damageAmount;
    if (combatResults.damageType === DamageType.holy) {
      totalThreat = totalThreat * (1 + holythreatModifier);
    }
    if (combatResults.circumstance === 'Holy Shield') {
      totalThreat = totalThreat * 1.35
    }
    return totalThreat
  }

}

interface SimResultsGraphInterface {
  name: string,
  '15 seconds min': number,
  '15 seconds 1% low': number,
  '15 seconds 5% low': number,
  '15 second average': number,
  '15 second max': number,
  '2 minute min': number,
  '2 minute 1% low': number,
  '2 minute 5% low': number,
  '2 minute average': number,
  '2 minute max': number,
}

interface DamageThreatInterface {
  damage: number,
  threat: number
}
