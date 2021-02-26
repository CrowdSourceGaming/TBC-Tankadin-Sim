import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GearSlots } from '../character/gearslot';
import { Enchant } from '../item/enchant';
import { ItemStats, ItemStatsEnum } from '../item/item-stats';

@Component({
  selector: 'app-new-enchant',
  templateUrl: './new-enchant.component.html',
  styleUrls: ['./new-enchant.component.scss']
})
export class NewEnchantComponent implements OnInit {

  attributes = Object.values(ItemStatsEnum).sort();

  enchant: Enchant = { _id: 0, id: 0, name: '', stats: {}, slot: GearSlots.head, type: 'Item' }
  GearSlotsKeys = Object.keys(GearSlots).sort();

  newEnchantFG!: FormGroup;

  addAttributesFormGroup = new FormGroup({
    attributeName: new FormControl(''),
    attributeValue: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<NewEnchantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAttributes() {
    const keys = [];
    for (const [key] of Object.entries(this.enchant.stats)) {
      keys.push(key as keyof ItemStats);
    }
    return keys;
  }

  addAttribute(event: any) {
    const key = this.addAttributesFormGroup.get('attributeName');
    const value = this.addAttributesFormGroup.get('attributeValue')
    if(key && value){
      this.enchant.stats[key.value as keyof typeof ItemStatsEnum] = value.value;
      key?.setValue('');
      value?.setValue('');
      event.stopPropagation();
    }
  }

  removeStat(key: string) {
    delete this.enchant.stats[key as keyof typeof ItemStatsEnum];
  }

  ngOnInit(): void {
    this.newEnchantFG = new FormGroup({
      tbcdbLink: new FormControl('', [Validators.required, this.validateTBCDBLink()]),
      enchantName: new FormControl('', [Validators.required]),
      gearSlot: new FormControl({ value: this.data.gearSlot, disabled: true }, [Validators.required])
    });
  }

  createItem() {
    if (this.newEnchantFG.valid) {
      this.enchant.name = this.newEnchantFG.get('enchantName')?.value
      this.enchant.slot = this.data.gearSlot;
      this.dialogRef.close(this.enchant);
    }
  }


  private validateTBCDBLink(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regEx = new RegExp(/^https:\/\/tbcdb.com\/\?(spell|item)\=(\d+)$/)
      const matchers = control.value.match(regEx);
      if (matchers && matchers[1] && matchers[2]) {
        this.enchant.type = matchers[1]
        this.enchant._id = matchers[2]
        this.enchant.id = matchers[2]
        return null;
      } else {
        return { invalidLink: { value: control.value } }
      }
    }
  }

}
