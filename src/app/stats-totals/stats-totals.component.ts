import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Character } from '../character/character';
import { ItemStats, ItemStatsEnum } from '../character/item-stats';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-stats-totals',
  templateUrl: './stats-totals.component.html',
  styleUrls: ['./stats-totals.component.scss']
})
export class StatsTotalsComponent implements OnInit {

  constructor(private SharedDataService: SharedDataService) { }

  character!: Character;
  ItemStatsEnum = ItemStatsEnum;

  ngOnInit(): void {
    this.character = this.SharedDataService.character;
  }

}


