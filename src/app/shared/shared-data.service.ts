import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../character/character';
import { MatSnackBar } from '@angular/material/snack-bar';

import { deserialize, serialize } from 'typescript-json-serializer';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  character: BehaviorSubject<Character> = new BehaviorSubject<Character>(new Character());

  constructor(private _snackBar: MatSnackBar) { }

  saveCharacter() {
    const characterJson = serialize(this.character.value, true)
    localStorage.setItem('character', JSON.stringify(characterJson));
    this._snackBar.open('Character Saved!', undefined, { duration: 3000 })
  }

  loadCharacter() {
    const characterJson = localStorage.getItem('character');
    if (characterJson) {
      this.character.next(deserialize(JSON.parse(characterJson), Character));
      this._snackBar.open('Character Loaded!', undefined, { duration: 3000 })
    } else {
      this._snackBar.open('No saved character to load :-(', undefined, { duration: 3000 })
    }
  }
}
