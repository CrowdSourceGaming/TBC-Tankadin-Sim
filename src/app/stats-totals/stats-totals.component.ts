import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Character } from '../character/character';
import { ItemStats, ItemStatsEnum } from '../item/item-stats';
import { NewSpecComponent } from '../new-spec/new-spec.component';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-stats-totals',
  templateUrl: './stats-totals.component.html',
  styleUrls: ['./stats-totals.component.scss']
})
export class StatsTotalsComponent implements OnInit {

  constructor(private SharedDataService: SharedDataService, public dialog: MatDialog) { }

  character!: Character;
  ItemStatsEnum = ItemStatsEnum;

  ngOnInit(): void {
    this.SharedDataService.character.subscribe(character => this.character = character);
  }

  createNewSpec(event: any) {
    this.dialog.open(NewSpecComponent, {
      width: '500px'
    });
    event.stopPropagation();
  }

}


