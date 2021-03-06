import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../character/character';
import { GearSlots } from '../character/gearslot';
import { Item } from '../item/item';
import { ItemStats, ItemStatsEnum, ItemType } from '../item/item-stats';
import { GearService } from '../gear/gear.service';
import { NewGearComponent } from '../new-gear/new-gear.component';
import { SharedDataService } from '../shared/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: `app-gear-selector`,
  templateUrl: `./gear-selector.component.html`,
  styleUrls: [`./gear-selector.component.scss`]
})
export class GearSelectorComponent implements OnInit, AfterViewInit {

  @Input()
  gearType!: GearSlots;

  displayedColumns: string[] = [];
  @ViewChild(MatSort)
  sort!: MatSort;

  dataSourceGearOptions: MatTableDataSource<Item> = new MatTableDataSource<Item>();
  character!: Character;
  ItemStatsEnum = ItemStatsEnum;
  gearOptions: Item[] = [];

  constructor(private sharedDataService: SharedDataService, private gearService: GearService, public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.sharedDataService.character.subscribe(character => this.character = character);
    this.gearService.gearOptions.subscribe(newGearOptions => {
      this.gearOptions = newGearOptions.filter(gear => {
        if (this.gearType === GearSlots.fingerOne || this.gearType === GearSlots.fingerTwo) {
          return gear.validSlot?.includes(GearSlots.fingerOne) || gear.validSlot?.includes(GearSlots.fingerTwo)
        } else if (this.gearType === GearSlots.trinketOne || this.gearType === GearSlots.trinketTwo) {
          return gear.validSlot?.includes(GearSlots.trinketOne) || gear.validSlot?.includes(GearSlots.trinketTwo)
        } else {
          return gear.validSlot?.includes(this.gearType)
        }
      })
      this.dataSourceGearOptions.data = this.gearOptions;
    })
    this.displayedColumns = [
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
      `stats.${ItemStatsEnum.expertiseRating}`
    ]
    if (this.gearType === GearSlots.mainHand) {
      this.displayedColumns.push(...[`stats.${ItemStatsEnum.attackSpeed}`, `stats.${ItemStatsEnum.damageMin}`, `stats.${ItemStatsEnum.damageMax}`])
    }
    this.displayedColumns.push('anchor')

  }
  ngAfterViewInit() {
    this.initGearSeletion();
  }

  assignGear(armor: Item) {
    if (armor) {
      let uniqueApply = true;
      if (armor.unique) {
        Object.keys(this.character.gear).forEach(slot => {
          if (this.character.gear[slot as keyof typeof GearSlots].name === armor.name) {
            this.snackbar.open(`Cannot add ${armor.name} because it's unique.`, undefined, { duration: 5000 })
            uniqueApply = false;
            return;
          }
        })
      }
      if (uniqueApply) {
        this.character.gear[this.gearType] = armor;
        this.sharedDataService.character.next(this.character);
      }
    }
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
    this.dataSourceGearOptions.sortingDataAccessor = (item: any, path: string): any => {
      return path.split(`.`)
        .reduce((accumulator: any, key: string) => {
          return accumulator ? accumulator[key] : undefined;
        }, item);
    }
    this.sort.sort(({id: 'name', start: 'asc'}) as MatSortable)
    this.dataSourceGearOptions.sort = this.sort;
  }

}
