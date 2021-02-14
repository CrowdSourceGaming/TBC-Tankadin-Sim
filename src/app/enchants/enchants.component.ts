import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../character/character';
import { GearSlots } from '../character/gearslot';
import { GearService } from '../gear/gear.service';
import { Enchant } from '../item/enchant';
import { EnchantService } from '../item/enchant.service';
import { Item } from '../item/item';
import { ItemStatsEnum } from '../item/item-stats';
import { NewEnchantComponent } from '../new-enchant/new-enchant.component';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-enchants',
  templateUrl: './enchants.component.html',
  styleUrls: ['./enchants.component.scss']
})
export class EnchantsComponent implements OnInit, AfterViewInit {

  @Input()
  gearType!: GearSlots
  displayedColumns = ['name', 'stat', 'anchor']
  // character!: Character;

  enchants: Enchant[] = [];
  gear: Item[] = [];
  activeEnchant = null;
  dataSourceEnchantOptions: MatTableDataSource<Enchant> = new MatTableDataSource<Enchant>([]);

  constructor(private enchantService: EnchantService, public dialog: MatDialog, private gearService: GearService) { }

  ngOnInit(): void {
    this.enchantService.enchants.subscribe(enchants => {
      const filteredEnchants = enchants.filter(enchant => enchant.slot === this.gearType).sort((a, b) => a.name < b.name ? -1 : 1)
      this.dataSourceEnchantOptions.data = filteredEnchants;
    })
    this.gearService.gearOptions.subscribe(gear => this.gear = gear.filter(g => g.validSlot === this.gearType));
  }

  assignGear(enchant: Enchant) {
    this.gear.forEach(g => g.enchant = enchant);
    const allGear = this.gearService.gearOptions.value;
    allGear.forEach(item => {
      if(item.validSlot === this.gearType){
        item.enchant = enchant;
      }
    })
    this.gearService.gearOptions.next(allGear)
  }

  getGearItem() {
    const gear = this.gearService.gearOptions.value.find(g => g.validSlot === this.gearType);
    return gear;
  }

  statBoostString(enchant: Enchant): string {
    const stats = Object.keys(enchant.stats)
    let string = ''
    stats.forEach(stat => {
      string += `+${enchant.stats[stat as keyof typeof ItemStatsEnum]} ${stat} `
    })
    return string
  }

  addEnchant() {
    const dialogRef = this.dialog.open(NewEnchantComponent, {
      width: '550px',
      data: { gearSlot: this.gearType }
    });

    dialogRef.afterClosed().subscribe((newItem: Enchant) => {
      if (newItem) {
        this.enchantService.addEnchant(newItem);
      }
    });
  }

  ngAfterViewInit() {
  }

}
