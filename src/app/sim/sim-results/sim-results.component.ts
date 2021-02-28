import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { CombatService, SimResults, TimeSlotResults } from '../combat.service';

@Component({
  selector: 'app-sim-results',
  templateUrl: './sim-results.component.html',
  styleUrls: ['./sim-results.component.scss']
})
export class SimResultsComponent implements OnInit {

  showGraph: boolean = false;
  runningSimulation: boolean = false;

  dataSource: MatTableDataSource<SimResultsGraphInterface> = new MatTableDataSource(new Array());

  constructor(private combatService: CombatService) { }

  FULL_DURATION_SECONDS = 120

  showColumns = ['valueType', 'min', 'onePercentLow', 'fivePercentLow', 'average', 'max']

  ngOnInit(): void {
    this.combatService.runningSimulation.subscribe((runningSim) => { this.runningSimulation = runningSim })
    this.combatService.combatResults.subscribe((combatResults: SimResults[]) => {
      if (combatResults[0]) {
        const dataTable = this.translateDataToTable(combatResults);
        this.dataSource.data = dataTable;
        this.showGraph = true;
      }
    })
  }

  private translateDataToTable(fullRunValues: SimResults[]): SimResultsGraphInterface[] {
    const onePercentLowIndex = Math.floor(fullRunValues.length * 0.01);
    const fivePercentLowIndex = Math.floor(fullRunValues.length * 0.05);
    return [{
      name: `DPS (First ${this.combatService.BURST_SECONDS} Seconds)`,
      "min": Math.round(this.combatService.dpsForRun(this.combatService.sortForDamage(fullRunValues, true)[0], true)),
      "1% low": Math.round(this.combatService.dpsForRun(this.combatService.sortForDamage(fullRunValues, true)[onePercentLowIndex], true)),
      "5% low": Math.round(this.combatService.dpsForRun(this.combatService.sortForDamage(fullRunValues, true)[fivePercentLowIndex], true)),
      "average": Math.round(fullRunValues.reduce((a, b) => a + this.combatService.dpsForRun(b, true), 0) / fullRunValues.length),
      "max": Math.round(this.combatService.dpsForRun(this.combatService.sortForDamage(fullRunValues, true)[fullRunValues.length - 1], true))
    },
    {
      name: 'DPS (2 Minute Fight)',
      "min": Math.round(this.combatService.dpsForRun(this.combatService.sortForDamage(fullRunValues, false)[0], false)),
      "1% low": Math.round(this.combatService.dpsForRun(this.combatService.sortForDamage(fullRunValues, false)[onePercentLowIndex], false)),
      "5% low": Math.round(this.combatService.dpsForRun(this.combatService.sortForDamage(fullRunValues, false)[fivePercentLowIndex], false)),
      "average": Math.round(fullRunValues.reduce((a, b) => a + this.combatService.dpsForRun(b, false), 0) / fullRunValues.length),
      "max": Math.round(this.combatService.dpsForRun(this.combatService.sortForDamage(fullRunValues, false)[fullRunValues.length - 1], false))
    },
    {
      name: `TPS (First ${this.combatService.BURST_SECONDS} Seconds)`,
      "min": Math.round(this.combatService.tpsForRun(this.combatService.sortForThreat(fullRunValues, true)[0], true)),
      "1% low": Math.round(this.combatService.tpsForRun(this.combatService.sortForThreat(fullRunValues, true)[onePercentLowIndex], true)),
      "5% low": Math.round(this.combatService.tpsForRun(this.combatService.sortForThreat(fullRunValues, true)[fivePercentLowIndex], true)),
      "average": Math.round(fullRunValues.reduce((a, b) => a + this.combatService.tpsForRun(b, true), 0) / fullRunValues.length),
      "max": Math.round(this.combatService.tpsForRun(this.combatService.sortForThreat(fullRunValues, true)[fullRunValues.length - 1], true))
    },
    {
      name: 'TPS (2 Minute Fight)',
      "min": Math.round(this.combatService.tpsForRun(this.combatService.sortForThreat(fullRunValues, false)[0], false)),
      "1% low": Math.round(this.combatService.tpsForRun(this.combatService.sortForThreat(fullRunValues, false)[onePercentLowIndex], false)),
      "5% low": Math.round(this.combatService.tpsForRun(this.combatService.sortForThreat(fullRunValues, false)[fivePercentLowIndex], false)),
      "average": Math.round(fullRunValues.reduce((a, b) => a + this.combatService.tpsForRun(b, false), 0) / fullRunValues.length),
      "max": Math.round(this.combatService.tpsForRun(this.combatService.sortForThreat(fullRunValues, false)[fullRunValues.length - 1], false))
    }]
  }
}

interface SimResultsGraphInterface {
  name: string,
  'min': number,
  '1% low': number,
  '5% low': number,
  'average': number,
  'max': number,
}
