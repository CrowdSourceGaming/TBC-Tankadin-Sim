import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../character/character';
import { GearSlots } from '../character/gearslot';
import { Item } from '../character/item';
import { ItemStats, ItemStatsEnum } from '../character/item-stats';
import { RetrieveGearFactoryService } from '../gear/retrieve-gear-factory.service';
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

  gearOptions!: MatTableDataSource<Item>;
  character!: Character;
  ItemStatsEnum = ItemStatsEnum;

  constructor(private sharedDataService: SharedDataService, private retriveGearFactoryService: RetrieveGearFactoryService) { }

  ngOnInit(): void {
    this.gearOptions = new MatTableDataSource(this.retriveGearFactoryService.getGearForSlot(this.gearType));
    this.character = this.sharedDataService.character;
  }
  ngAfterViewInit() {
    this.gearOptions.sortingDataAccessor = (item: any, path: string): any => {
      return path.split(`.`)
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

  getValueFromGear(gear: Item, stat: ItemStatsEnum) {
    return gear.stats[stat] || 0;
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
