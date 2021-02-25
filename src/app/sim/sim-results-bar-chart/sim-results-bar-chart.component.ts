import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CombatService, SimResults } from '../combat.service';
import { DetailChartCommandInterface } from '../sim/sim.component';

@Component({
  selector: 'app-sim-results-bar-chart',
  templateUrl: './sim-results-bar-chart.component.html',
  styleUrls: ['./sim-results-bar-chart.component.scss']
})
export class SimResultsBarChartComponent implements OnInit {

  @Output() changeDetailChart = new EventEmitter<DetailChartCommandInterface>();

  openingBurst: boolean = false;
  displayChart: boolean = false;

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Simulation (sorted)';
  yAxisLabel: string = 'Damage/Threat Done';
  schemeType: string = 'ordinal'
  noBarWhenZero: boolean = false;
  view: any[number] = [10000, 400];
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };
  overallResultsBarChart: BehaviorSubject<resultsBarChartInterface[]> = new BehaviorSubject(new Array());

  constructor(private combatService: CombatService) { }

  ngOnInit(): void {
    this.combatService.combatResults.subscribe((simResults: SimResults[]) => {
      this.createBarChat(simResults);
    });
  }

  selectChart(event: any) {
    console.log('click event', event)
    this.changeDetailChart.emit({
      simulationNumber: event.series,
      statToShow: event.name
    })
  }

  private createBarChat(simResults: SimResults[]) {
    if (simResults[0]) {
      const results: resultsBarChartInterface[] = new Array();
      this.combatService.sortForThreat(simResults, this.openingBurst)
      simResults.forEach(simulation => {
        results.push({
          name: simulation.runNumber,
          series: [
            {
              name: 'TPS',
              value: this.combatService.tpsForRun(simulation, this.openingBurst)
            },
            {
              name: 'DPS',
              value: this.combatService.dpsForRun(simulation, this.openingBurst)
            }]
        })
      })
      this.overallResultsBarChart.next(results);
      if (results.length > 0) {
        this.displayChart = true;
      }
    }
  }

}

interface dataSeries { name: string, value: number, comment?: string }
interface resultsBarChartInterface { name: number, series: Array<dataSeries> }

