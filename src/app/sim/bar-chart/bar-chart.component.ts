import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CombatService, SimResults } from '../combat.service';
import { DetailChartCommandInterface } from '../sim/sim.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input()
  chartToDisplay: DetailChartCommandInterface = { simulationNumber: 0, statToShow: 'DPS' }
  combatResults: SimResults[] = new Array();

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
  view: any[number] = [6000, 400];
  xAxisTickFormatting = ((label: number) => { return label.toFixed(2) });
  overallResultsBarChart: BehaviorSubject<resultsBarChartInterface[]> = new BehaviorSubject(new Array());

  displayChart: boolean = false;

  constructor(private combatService: CombatService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartToDisplay']) {
      this.chartToDisplay = (changes['chartToDisplay'].currentValue || { simulationNumber: 0, statToShow: 'DPS' })
      this.createBarChart(this.combatResults)
    }
  }

  ngOnInit(): void {
    this.combatService.combatResults.subscribe(combatResults => {
      this.combatResults = combatResults;
      this.createBarChart(this.combatResults)
    });
  }


  private createBarChart(combatResults: SimResults[]) {
    if (combatResults && combatResults.length > 0) {
      const simulation = this.combatResults.find(r => r.runNumber === this.chartToDisplay.simulationNumber);
      if (simulation) {
        const results: resultsBarChartInterface[] = []
        simulation.simResults.forEach((tenMilliSeconds, index) => {
          tenMilliSeconds.damageDone.forEach(damage => {
            const rootName = (index + this.combatService.precast.length * -150) / 100;
            const lookupResults = results && results.find((result: any) => result.name === rootName);
            let value = 0;
            if (this.chartToDisplay.statToShow === 'DPS') {
              this.yAxisLabel = 'Damage Done'
              value = damage.damageAmount
            } else if (this.chartToDisplay.statToShow === 'TPS') {
              this.yAxisLabel = 'Threat Caused'
              value = damage.threat || 0
            }
            if (!lookupResults) {
              results.push({ name: rootName, series: [{ name: damage.circumstance, value: value, comment: damage.comment }] });
            } else {
              const damageThisTurn = lookupResults.series.find(r => r.name === damage.circumstance);
              if (damageThisTurn) {
                damageThisTurn.value += value;
              } else {
                lookupResults.series.push({ name: damage.circumstance, value: value, comment: damage.comment });
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

}

interface resultsBarChartInterface { name: number, series: [{ name: string, value: number, comment?: string }] }
