import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GearSlots } from '../character/gearslot';
import { GearSet, GemSocketColor, Item } from '../character/item';
import { ItemStats, ItemStatsEnum } from '../character/item-stats';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-gear',
  templateUrl: './new-gear.component.html',
  styleUrls: ['./new-gear.component.scss']
})
export class NewGearComponent implements OnInit {

  item: Item = new Item();
  GearSlots = Object.keys(GearSlots).sort();
  attributeList = Object.keys(ItemStatsEnum).sort();
  GemSocketColors = Object.keys(GemSocketColor).sort();
  GearSets = Object.values(GearSet).sort();
  selectedGearSlot!: GearSlots;

  constructor(
    public dialogRef: MatDialogRef<NewGearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  addAttributesFormGroup = new FormGroup({
    attributeName: new FormControl(''),
    attributeValue: new FormControl('')
  })

  addGemSocketBonusFormGroup = new FormGroup({
    attributeName: new FormControl(''),
    attributeValue: new FormControl('')
  })

  createItemFormGroup!: FormGroup;

  addGemSocketFormGroup = new FormGroup({
    gemSocketColorToAdd: new FormControl('')
  })


  ngOnInit(): void {
    this.selectedGearSlot = this.data.gearSlot;
    console.log('this.selectedGearSlot', this.selectedGearSlot)
    console.log('GearSlots.mainHand', GearSlots.mainHand)
    console.log('not equal', this.selectedGearSlot !== GearSlots.mainHand)
    if (this.selectedGearSlot !== GearSlots.mainHand) {
      const damageMinIdx = this.attributeList.findIndex(attr => attr === ItemStatsEnum.damageMin)
      this.attributeList.splice(damageMinIdx, 1);
      const damageMaxIdx = this.attributeList.findIndex(attr => attr === ItemStatsEnum.damageMax)
      this.attributeList.splice(damageMaxIdx, 1);
      const attackSpeedIdx = this.attributeList.findIndex(attr => attr === ItemStatsEnum.attackSpeed)
      this.attributeList.splice(attackSpeedIdx, 1);
    }

    this.createItemFormGroup = new FormGroup({
      tbcdbLink: new FormControl('', { validators: [Validators.required, this.validateTBCDBLink()] }),
      itemName: new FormControl('', { validators: [Validators.required] }),
      gearSlot: new FormControl({ value: this.selectedGearSlot, disabled: true }),
      gearSet: new FormControl({ value: GearSet.none, disabled: false }, { validators: [Validators.required] })
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAttributes() {
    const keys = [];
    for (const [key] of Object.entries(this.item.stats)) {
      keys.push(key as keyof ItemStats);
    }
    return keys;
  }

  addAttribute(event: any) {
    const key = this.addAttributesFormGroup.get('attributeName');
    const value = this.addAttributesFormGroup.get('attributeValue')
    this.item.stats[key?.value as keyof typeof ItemStatsEnum] = +value?.value;
    key?.setValue('');
    value?.setValue('');
    event.stopPropagation();
  }

  removeStat(key: string) {
    delete this.item.stats[key as keyof typeof ItemStatsEnum];
  }

  addGemSocket(event: any) {
    this.item.gemSockets.push(this.addGemSocketFormGroup.get('gemSocketColorToAdd')?.value)
    event.stopPropagation();
  }

  removeGemSocket(gemSocketIndex: number) {
    this.item.gemSockets.splice(gemSocketIndex, 1);
  }

  createItem() {
    if (this.createItemFormGroup.valid) {
      this.item.set = this.createItemFormGroup.get('gearSet')?.value;
      this.item.name = this.createItemFormGroup.get('itemName')?.value;
      if (this.addGemSocketBonusFormGroup.get('attributeName')?.value &&
        this.addGemSocketBonusFormGroup.get('attributeValue')?.value) {

        const attribute = this.addGemSocketBonusFormGroup.get('attributeName')?.value;
        const value = this.addGemSocketBonusFormGroup.get('attributeValue')?.value
        this.item.gemSocketBonus = { [attribute as keyof ItemStats]: value }
      }
      this.item.validSlot = this.selectedGearSlot;
      console.log(this.item);
      this.dialogRef.close(this.item);
      // this.dialogRef.close();
    }
  }


  private validateTBCDBLink(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regEx = new RegExp(/^https:\/\/tbcdb.com\/\?item\=(\d+)$/)
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

}
