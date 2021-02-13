import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../character/character';
import { MatSnackBar } from '@angular/material/snack-bar';

import { deserialize, serialize } from 'typescript-json-serializer';
import { Item } from '../item/item';
import { Spec } from '../character/spec';
import { GearSlots } from '../character/gearslot';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  character: BehaviorSubject<Character> = new BehaviorSubject<Character>(new Character());

  constructor(private _snackBar: MatSnackBar) { }

  saveCharacter() {
    const characterJson = serialize(this.character.value, false)
    localStorage.setItem('character', JSON.stringify(characterJson));
    this._snackBar.open('Character Saved!', undefined, { duration: 3000 })
  }

  loadCharacter() {
    const characterJson = localStorage.getItem('character');
    if (characterJson) {
      const character = deserialize(JSON.parse(characterJson), Character)
      Object.keys(character.gear).forEach(key => {
        character.gear[key as keyof typeof GearSlots] = deserialize(character.gear[key as keyof typeof GearSlots], Item)
      })
      console.log('type checks');
      console.log(character instanceof Character);
      console.log(character.spec instanceof Spec);
      console.log(character.gear.head instanceof Item);
      this.character.next(character);
      this._snackBar.open('Character Loaded!', undefined, { duration: 3000 })
    } else {
      this._snackBar.open('No saved character to load :-(', undefined, { duration: 3000 })
    }
  }
}
