import { Component, OnInit } from '@angular/core';
import { CombatService } from '../combat.service';
import { Creature } from '../creature';
import { BehaviorSubject } from 'rxjs';
import { TimeSlotResults } from '../combat.service'
import { SharedDataService } from '../../shared/shared-data.service'

const TWO_MINUTES = 2 * 60 * 1000


interface resultsLineChartInterface {
  name: string,
  series: [{ name: number, value: number, comment?: string }],
}

interface resultsBarChartInterface { name: number, series: [{ name: string, value: number, comment?: string }] }

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

  overallResultsBarChart: BehaviorSubject<resultsBarChartInterface[]> = new BehaviorSubject([{ name: 0, series: [{ name: '', value: 0 }] }]);
  overallResultsLineChart: BehaviorSubject<resultsLineChartInterface[]> = new BehaviorSubject([{ name: '', series: [{ name: 0, value: 0 }] }]);

  ngOnInit(): void {
  }

  start() {
    this.overallResultsBarChart.next([{ name: 0, series: [{ name: '', value: 0 }] }])
    const date = Date.now();
    const combatResults = this.combatService.startCombat(this.sharedDataService.character.value, new Creature(), TWO_MINUTES)
    this.createBarChart(combatResults);
    this.createLineChart(combatResults);
    this.simComplete = true;

    console.log(this.overallResultsBarChart)
  }

  private createLineChart(combatResults: TimeSlotResults[]) {
    const results: resultsLineChartInterface[] = [{ name: '', series: [{ name: 0, value: 0, comment: '' }] }]
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
    const results: resultsBarChartInterface[] = [{ name: 0, series: [{ name: '', value: 0 }] }]
    combatResults.forEach((tenMilliSeconds, index) => {
      tenMilliSeconds.damageDone.forEach(damage => {
        const rootName = index / 100;
        const lookupResults = results && results.find((result: any) => result.name === rootName);
        if (!lookupResults) {
          results.push({ name: index / 100, series: [{ name: damage.circumstance, value: damage.damageAmount, comment: damage.comment }] });
        } else {
          const damageThisTurn = lookupResults.series.find(r => r.name === damage.circumstance);
          if (damageThisTurn) {
            damageThisTurn.value += damage.damageAmount;
          } else {
            lookupResults.series.push({ name: damage.circumstance, value: damage.damageAmount, comment: damage.comment });
          }
        }
      });
    });
    this.overallResultsBarChart.next(results);
  }

}
