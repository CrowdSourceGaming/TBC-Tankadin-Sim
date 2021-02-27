import { Component, OnInit } from '@angular/core';
import { CombatService } from '../combat.service';

@Component({
  selector: 'app-sim-setup',
  templateUrl: './sim-setup.component.html',
  styleUrls: ['./sim-setup.component.scss']
})
export class SimSetupComponent implements OnInit {

  constructor(private combatService: CombatService) { }

  ngOnInit(): void {
  }

  activeBuff(nameOfSpell: string) {
    return this.combatService.activeAbilities.has(nameOfSpell) ? '' : 'inactive';
  }

  setSeal(nameOfSeal: string) {
    this.combatService.activeAbilities.delete('Seal of Righteousness')
    this.combatService.activeAbilities.delete('Seal of Vengeance')
    this.combatService.activeAbilities.add(nameOfSeal);
  }

}
