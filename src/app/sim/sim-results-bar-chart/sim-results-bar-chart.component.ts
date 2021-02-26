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

  fullRun: boolean = true;
  displayChart: boolean = false;

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Simulation (sorted)';
  yAxisLabel: string = 'DPS/TPS';
  schemeType: string = 'ordinal'
  noBarWhenZero: boolean = false;
  view: any[number] = [10000, 400];
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  simResults: SimResults[] = new Array();
  overallResultsBarChart: BehaviorSubject<resultsBarChartInterface[]> = new BehaviorSubject(new Array());

  constructor(private combatService: CombatService) { }

  ngOnInit(): void {
    this.combatService.combatResults.subscribe((simResults: SimResults[]) => {
      this.simResults = simResults
      this.createBarChat();
    });
  }

  updateFullRunToggle(event: any) {
    this.fullRun = event.checked
    this.createBarChat();
  }

  selectChart(event: any) {
    this.changeDetailChart.emit({
      simulationNumber: event.series,
      statToShow: event.name
    })
  }

  private createBarChat() {
    if (this.simResults[0]) {
      const results: resultsBarChartInterface[] = new Array();
      this.combatService.sortForThreat(this.simResults, !this.fullRun)
      this.simResults.forEach(simulation => {
        results.push({
          name: simulation.runNumber,
          series: [
            {
              name: 'TPS',
              value: this.combatService.tpsForRun(simulation, !this.fullRun)
            },
            {
              name: 'DPS',
              value: this.combatService.dpsForRun(simulation, !this.fullRun)
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

