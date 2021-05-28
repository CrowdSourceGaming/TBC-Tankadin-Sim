import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GearSlots } from '../character/gearslot';
import { GearSet, GemSocketColor, Item, WeaponType } from '../item/item';
import { ItemStats, ItemStatsEnum } from '../item/item-stats';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GemSocket } from '../gem-socket';
import { BlizzardApiService, ItemResponse } from '../blizzard-api.service';

@Component({
  selector: 'app-new-gear',
  templateUrl: './new-gear.component.html',
  styleUrls: ['./new-gear.component.scss']
})
export class NewGearComponent implements OnInit {

  item: Item = new Item();
  GearSlots = GearSlots
  attributeList = Object.keys(ItemStatsEnum).sort();
  GemSocketColors = Object.keys(GemSocketColor).sort();

  errors = {
    weaponStats: {
      active: false,
      errorMessage: "Weapons must have 'Attack Speed', 'Damage Min', and 'Damage Max' attributes"
    }
  }

  constructor(
    public dialogRef: MatDialogRef<NewGearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private blizzardApiService: BlizzardApiService) {
    dialogRef.disableClose = true;
  }

  createItemFormGroup!: FormGroup;

  addGemSocketBonusFormGroup = new FormGroup({
    attributeName: new FormControl(''),
    attributeValue: new FormControl('')
  })

  addGemSocketFormGroup = new FormGroup({
    gemSocketColorToAdd: new FormControl('')
  })




  ngOnInit(): void {
    this.createItemFormGroup = new FormGroup({
      itemNumber: new FormControl('', { validators: [Validators.required, this.validateWowheadLink()] }),
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addGemSocket(event: any) {
    const color = this.addGemSocketFormGroup.get('gemSocketColorToAdd')?.value;
    this.item.gemSockets.push(new GemSocket(color))
    event.stopPropagation();
  }

  removeGemSocket(gemSocketIndex: number) {
    this.item.gemSockets.splice(gemSocketIndex, 1);
  }

  private validateWowheadLink(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regEx = new RegExp(/^https:\/\/tbc.wowhead.com\/item\=(\d+)/)
      const matchers = control.value.match(regEx);
      if (matchers && matchers[1]) {
        this.item._id = matchers[1]
        this.item.id = matchers[1]
        return null;
      } else {
        return { invalidLink: { value: control.value } }
      }
    }
  }

  async createItem() {
    if (this.createItemFormGroup.valid) {
      const apiCall = await this.blizzardApiService.getItemInfo(this.item)
      apiCall.subscribe((res: ItemResponse) => {
        const attribute = this.addGemSocketBonusFormGroup.get('attributeName')?.value;
        const value = this.addGemSocketBonusFormGroup.get('attributeValue')?.value
        if (attribute && value) {
          this.item.gemSocketBonus = { [attribute as keyof ItemStats]: value }
        }
        this.dialogRef.close(this.item);
      });
    }
  }

  // createItem() {
  //   if (this.createItemFormGroup.valid) {
  //     this.item.set = this.createItemFormGroup.get('gearSet')?.value;
  //     this.item.name = this.createItemFormGroup.get('itemName')?.value;
  //     this.item.unique = this.createItemFormGroup.get('unique')?.value;
  //     const attribute = this.addGemSocketBonusFormGroup.get('attributeName')?.value;
  //     const value = this.addGemSocketBonusFormGroup.get('attributeValue')?.value
  //     this.item.gemSockets.sort((a, b) => {
  //       if (a.color === GemSocketColor.meta) { // always list meta first
  //         return -1
  //       } else {
  //         return 0
  //       }
  //     })
  //     if (attribute && value) {
  //       this.item.gemSocketBonus = { [attribute as keyof ItemStats]: value }
  //     }
  //     if (this.selectedGearSlot === GearSlots.mainHand) {
  //       this.item.weaponType = this.createItemFormGroup.get('weaponType')?.value;
  //       if (!this.weaponIsValid()) {
  //         this.errors.weaponStats.active = true;
  //         return;
  //       }
  //     }
  //     this.item.validSlot = this.selectedGearSlot;
  //     this.dialogRef.close(this.item);
  //   }
  // }

}
