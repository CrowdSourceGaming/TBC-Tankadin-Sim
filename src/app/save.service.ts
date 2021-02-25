import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deserialize, serialize } from 'typescript-json-serializer';
import { Character } from './character/character';
import { GearSlots } from './character/gearslot';
import { GearService } from './gear/gear.service';
import { EnchantService } from './item/enchant.service';
import { SharedDataService } from './shared/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(private sharedDataService: SharedDataService, private gearService: GearService, private enchantService: EnchantService, private _snackBar: MatSnackBar) { }

  save() {
    const character = this.sharedDataService.character.value;
    const characterJson = serialize(this.sharedDataService.character.value, true)
    characterJson.gs = {};
    Object.keys(character.gear).forEach(slot => {
      characterJson.gs[slot] = {
        itemId: character.gear[slot as keyof typeof GearSlots].id,
        enchantId: character.gear[slot as keyof typeof GearSlots].enchant?.id
      }
    })
    const saveData = {
      character: characterJson,
      gemLogic: this.sharedDataService.gemLogic
    }
    localStorage.setItem('saveData', JSON.stringify(saveData));
    this._snackBar.open('Character Saved!', undefined, { duration: 3000 })
  }

  load() {
    const saveDataString = localStorage.getItem('saveData');
    if (saveDataString) {
      const characterJson = JSON.parse(saveDataString).character
      const character = deserialize(characterJson, Character);
      const realGear = this.gearService.gearOptions.value
      const slots = Object.keys(characterJson.gs);
      realGear.forEach(rg => {
        slots.forEach(slot => {
          const jsonGearSlot = characterJson.gs[slot]
          if (jsonGearSlot.itemId === rg.id) {
            if (jsonGearSlot.enchantId) {
              rg.enchant = this.enchantService.enchants.value.find(e => e.id === jsonGearSlot.enchantId)!
            }
            character.gear[slot as keyof typeof GearSlots] = rg;
          }
        })
      })
      this.sharedDataService.character.next(character);

      this.gearService.applyGemsToGear(JSON.parse(saveDataString).gemLogic)

      this._snackBar.open('Character Loaded!', undefined, { duration: 3000 })
    } else {
      this._snackBar.open('No saved character to load :-(', undefined, { duration: 3000 })
    }
  }
}
