import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Character } from '../character/character';
import { ItemStats } from '../character/item-stats';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-stats-totals',
  templateUrl: './stats-totals.component.html',
  styleUrls: ['./stats-totals.component.scss']
})
export class StatsTotalsComponent implements OnInit {

  constructor(private SharedDataService: SharedDataService) { }

  character!: Character;

  ngOnInit(): void {
    this.character = this.SharedDataService.character;
  }

  calculateTotalStats(stat: string): number {
    let total = 0;
    total += this.character.stats[stat as keyof ItemStats] || 0;
    Object.entries(this.character.gear).forEach(([slot, item]) => {
      total += item.stats[stat as keyof ItemStats] || 0;
    })
    return total;
  }

/*   calculateAttackPower(){
    this.calculateTotalStats()
  } */

}
