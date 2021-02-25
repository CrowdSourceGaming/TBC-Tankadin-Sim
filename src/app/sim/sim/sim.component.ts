import { Component, OnInit } from '@angular/core';
import { CombatService } from '../combat.service';
import { Creature } from '../creature';
import { SharedDataService } from '../../shared/shared-data.service'

const TWO_MINUTES = 2 * 60 * 1000

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.scss']
})
export class SimComponent {

  detailChartCommand: DetailChartCommandInterface = {
    simulationNumber: 0,
    statToShow: 'DPS'
  }

  constructor(private combatService: CombatService, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
  }

  start() {
    this.combatService.startCombat(TWO_MINUTES)
  }

  updateDetailChart(event: DetailChartCommandInterface) {
    this.detailChartCommand = event;
  }
}

export interface DetailChartCommandInterface {
  simulationNumber: number,
  statToShow: string
}
