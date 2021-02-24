import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CombatService, TimeSlotResults } from '../combat.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Combat Time (Seconds)';
  yAxisLabel: string = 'Damage Done';
  timeline: boolean = true;
  schemeType: string = 'ordinal'
  noBarWhenZero: boolean = false;
  view: any[number] = [3000, 400];
  xAxisTickFormatting = ((label: number) => { return label.toFixed(2) });
  overallResultsBarChart: BehaviorSubject<resultsBarChartInterface[]> = new BehaviorSubject(new Array());

  displayChart: boolean = false;

  constructor(private combatService: CombatService) { }

  ngOnInit(): void {
    this.combatService.combatResults.subscribe(combatResults => this.createBarChart(combatResults));
  }


  private createBarChart(combatResults: TimeSlotResults[][]) {
    if (combatResults[0]) {
      const results: resultsBarChartInterface[] = []
      combatResults[0].forEach((tenMilliSeconds, index) => {
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
      if (results.length > 0) {
        this.displayChart = true;
      }
    }
  }

}

interface resultsBarChartInterface { name: number, series: [{ name: string, value: number, comment?: string }] }
