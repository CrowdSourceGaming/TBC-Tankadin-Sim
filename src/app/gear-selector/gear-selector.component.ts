import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../character/character';
import { GearSlots } from '../character/gearslot';
import { Item } from '../character/item';
import { ItemStats } from '../character/item-stats';
import { RetrieveGearFactoryService } from '../gear/retrieve-gear-factory.service';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-gear-selector',
  templateUrl: './gear-selector.component.html',
  styleUrls: ['./gear-selector.component.scss']
})
export class GearSelectorComponent implements OnInit, AfterViewInit {

  @Input()
  gearType!: GearSlots;

  displayedColumns: string[] = ['name', 'stats.armor', 'stats.stamina', 'stats.intellect', 'stats.strength', 'stats.agility',
    'stats.spirit', 'stats.meleeHit', 'stats.meleeCrit', 'stats.expertise', 'stats.spellHit', 'stats.spellCrit', 'stats.spellPower', 'anchor'];

  @ViewChild(MatSort)
  sort!: MatSort;

  gearOptions!: MatTableDataSource<Item>;
  character!: Character

  constructor(private sharedDataService: SharedDataService, private retriveGearFactoryService: RetrieveGearFactoryService) { }

  ngOnInit(): void {
    this.gearOptions = new MatTableDataSource(this.retriveGearFactoryService.getGearForSlot(this.gearType));
    this.character = this.sharedDataService.character;
  }
  ngAfterViewInit() {
    this.gearOptions.sortingDataAccessor = (item: any, path: string): any => {
      return path.split('.')
        .reduce((accumulator: any, key: string) => {
          return accumulator ? accumulator[key] : undefined;
        }, item);
    }
    this.gearOptions.sort = this.sort;
  }

  assignGear(item: Item) {
    this.sharedDataService.character.gear[this.gearType] = item;
    console.log(`assigned ${item.name} to ${this.gearType}`)
  }

  // sortData(sort: Sort) {
  //   this.gearOptions. = this.gearOptions.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'calories': return compare(a.calories, b.calories, isAsc);
  //       case 'fat': return compare(a.fat, b.fat, isAsc);
  //       case 'carbs': return compare(a.carbs, b.carbs, isAsc);
  //       case 'protein': return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

}
