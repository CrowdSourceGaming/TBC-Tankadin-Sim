import { Component, OnInit } from '@angular/core';
import { Attack } from 'src/app/character/abilities/attack';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { BossAttack } from '../boss-abilities/boss-attack';
import { CombatService } from '../combat.service';
import { Creature } from '../creature';
import { curveLinear } from 'd3-shape';
import { BehaviorSubject } from 'rxjs';
import { SealOfVengeance } from 'src/app/character/abilities/seal-of-vengeance';
import { TimeSlotResults } from '../combat.service'

const TWO_MINUTES = 2 * 60 * 1000

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent {

  constructor(private combatService: CombatService, private sharedDataService: SharedDataService) { }

  view: any[number] = [1500, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time into fight';
  yAxisLabel: string = 'Damage Done';
  timeline: boolean = true;
  schemeType: string = 'ordinal'
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  simComplete = false;

  overallResultsBarChart: BehaviorSubject<[{ name: number, series: [{ name: string, value: number, comment?: string }] }]> = new BehaviorSubject([{ name: 0, series: [{ name: '', value: 0 }] }]);
  overallResultsLineChart: BehaviorSubject<[{ name: string, series: [{ name: number, value: number, comment?: string }] }]> = new BehaviorSubject([{ name: '', series: [{ name: 0, value: 0 }] }]);

  ngOnInit(): void {
  }

  start() {
    this.overallResultsBarChart.next([{ name: 0, series: [{ name: '', value: 0 }] }])
    const date = Date.now();
    this.combatService.registeredAbilities.playerAbiliities.push(new Attack());
    this.combatService.registeredAbilities.playerAbiliities.push(new SealOfVengeance());
    this.combatService.registeredAbilities.bossAbilities.push(new BossAttack());
    const combatResults = this.combatService.startCombat(this.sharedDataService.character.value, new Creature(), TWO_MINUTES)
    this.createBarChart(combatResults);
    this.createLineChart(combatResults);
    this.simComplete = true;

    console.log(this.overallResultsBarChart)
  }

  private createLineChart(combatResults: TimeSlotResults[]) {
    const results = this.overallResultsLineChart.value;
    combatResults.forEach((tenMilliSeconds, index) => {
      tenMilliSeconds.damageDone.forEach(damage => {
        const rootName = damage.circumstance;
        const lookupResults = results && results.find((result: any) => result.name === rootName);
        if (!lookupResults) {
          results.push({ name: rootName, series: [{ name: index / 100, value: damage.damageAmount, comment: damage.comment }] });
        } else {
          const damageThisTurn = lookupResults.series.find(r => r.name === index / 100);
          if (damageThisTurn) {
            damageThisTurn.value += damage.damageAmount;
          } else {
            lookupResults.series.push({ name: index / 100, value: damage.damageAmount, comment: damage.comment });
          }
        }
      });
    });
    this.overallResultsLineChart.next(results);
  }

  private createBarChart(combatResults: TimeSlotResults[]) {
    const results = this.overallResultsBarChart.value;
    combatResults.forEach((tenMilliSeconds, index) => {
      tenMilliSeconds.damageDone.forEach(damage => {
        const rootName = damage.circumstance;
        const lookupResults = results && results.find((result: any) => result.name === rootName);
        if (!lookupResults) {
          results.push({ name: index / 100, series: [{ name: rootName, value: damage.damageAmount }] });
        } else {
          const damageThisTurn = lookupResults.series.find(r => r.name === rootName);
          if (damageThisTurn) {
            damageThisTurn.value += damage.damageAmount;
          } else {
            lookupResults.series.push({ name: rootName, value: damage.damageAmount });
          }
        }
      });
    });
    this.overallResultsBarChart.next(results);
  }

}
