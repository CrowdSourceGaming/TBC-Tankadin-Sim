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

  constructor(private combatService: CombatService, private sharedDataService: SharedDataService) { }


  ngOnInit(): void {
  }

  start() {
    this.combatService.startCombat(this.sharedDataService.character.value, new Creature(), TWO_MINUTES)
  }
}
