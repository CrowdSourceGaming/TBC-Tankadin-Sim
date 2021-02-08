import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../character/character';
import { GearSlots } from '../character/gearslot';
import { Item } from '../character/item';
import { ItemStats, ItemStatsEnum, ItemType } from '../character/item-stats';
import { GearService } from '../gear/gear.service';
import { NewGearComponent } from '../new-gear/new-gear.component';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: `app-gear-selector`,
  templateUrl: `./gear-selector.component.html`,
  styleUrls: [`./gear-selector.component.scss`]
})
export class GearSelectorComponent implements OnInit, AfterViewInit {

  @Input()
  gearType!: GearSlots;

  displayedColumns: string[] = [
    // stats
    `name`, `stats.${ItemStatsEnum.stamina}`, `stats.${ItemStatsEnum.intellect}`,
    `stats.${ItemStatsEnum.strength}`, `stats.${ItemStatsEnum.agility}`, `stats.${ItemStatsEnum.spirit}`,
    // defense
    `stats.${ItemStatsEnum.armor}`, `stats.${ItemStatsEnum.defenseRating}`, `stats.${ItemStatsEnum.dodgeRating}`,
    `stats.${ItemStatsEnum.parryRating}`, `stats.${ItemStatsEnum.blockRating}`, `stats.${ItemStatsEnum.blockValue}`,
    //spell
    `stats.${ItemStatsEnum.spellHitRating}`, `stats.${ItemStatsEnum.spellCritRating}`, `stats.${ItemStatsEnum.spellDamage}`,
    //melee
    `stats.${ItemStatsEnum.meleeHitRating}`, `stats.${ItemStatsEnum.meleeCritRating}`,
    `stats.${ItemStatsEnum.expertiseRating}`, `anchor`];

  @ViewChild(MatSort)
  sort!: MatSort;

  dataSourceGearOptions!: MatTableDataSource<Item>;
  character!: Character;
  ItemStatsEnum = ItemStatsEnum;
  gearOptions: Item[] = [];

  constructor(private sharedDataService: SharedDataService, private gearService: GearService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.character = this.sharedDataService.character;
    this.gearService.gearOptions.subscribe(newGearOptions => {
      this.gearOptions = newGearOptions.filter(gear => gear.validSlot?.includes(this.gearType))
      console.log('this.gearOptions', this.gearOptions);
    })
  }
  ngAfterViewInit() {
    this.initGearSeletion();
  }

  assignGear(item: Item) {
    this.sharedDataService.character.gear[this.gearType] = item;
    console.log(`assigned ${item.name} to ${this.gearType}`)
  }

  getValueFromGear(gear: Item, stat: ItemStatsEnum) {
    return gear.stats[stat] || 0;
  }

  addGearToList(): void {
    const dialogRef = this.dialog.open(NewGearComponent, {
      width: '550px',
      data: { gearSlot: this.gearType }
    });

    dialogRef.afterClosed().subscribe((newItem: Item) => {
      if (newItem) {
        this.gearService.addGearForSlot(newItem, this.gearType);
      }
    });
  }

  private initGearSeletion() {

    this.dataSourceGearOptions = new MatTableDataSource(this.gearOptions);
    this.dataSourceGearOptions.sortingDataAccessor = (item: any, path: string): any => {
      return path.split(`.`)
        .reduce((accumulator: any, key: string) => {
          return accumulator ? accumulator[key] : undefined;
        }, item);
    }
    this.dataSourceGearOptions.sort = this.sort;
  }

  // sortData(sort: Sort) {
  //   this.gearOptions. = this.gearOptions.sort((a, b) => {
  //     const isAsc = sort.direction === `asc`;
  //     switch (sort.active) {
  //       case `name`: return compare(a.name, b.name, isAsc);
  //       case `calories`: return compare(a.calories, b.calories, isAsc);
  //       case `fat`: return compare(a.fat, b.fat, isAsc);
  //       case `carbs`: return compare(a.carbs, b.carbs, isAsc);
  //       case `protein`: return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

}
