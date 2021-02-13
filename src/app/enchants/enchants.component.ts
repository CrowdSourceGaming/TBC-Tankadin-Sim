import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GearSlots } from '../character/gearslot';
import { Enchant } from '../item/enchant';
import { EnchantService } from '../item/enchant.service';
import { ItemStatsEnum } from '../item/item-stats';

@Component({
  selector: 'app-enchants',
  templateUrl: './enchants.component.html',
  styleUrls: ['./enchants.component.scss']
})
export class EnchantsComponent implements OnInit, AfterViewInit {

  @Input()
  gearType!: GearSlots

  displayedColumns=['name', 'stat']

  enchants: Enchant[] = [];
  dataSourceEnchantOptions: MatTableDataSource<Enchant> = new MatTableDataSource<Enchant>([]);

  constructor(private enchantService: EnchantService) { }

  ngOnInit(): void {
    this.enchantService.enchants.subscribe(enchants => {
      const filteredEnchants = enchants.filter(enchant => enchant.slot === this.gearType).sort((a, b) => a.name < b.name ? -1 : 1)
      this.dataSourceEnchantOptions.data = filteredEnchants;
    })
  }

  statBoostString(enchant: Enchant): string{
    const stat = Object.keys(enchant.stats)[0]
    return `+${enchant.stats[stat as keyof typeof ItemStatsEnum]} ${stat}`
  }

  ngAfterViewInit() {
  }

}
