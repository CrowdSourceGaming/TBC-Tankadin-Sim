import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../character/character';
import { GemAlterationInterface } from '../gear/gear.service';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  title: BehaviorSubject<string> = new BehaviorSubject('');

  character: BehaviorSubject<Character> = new BehaviorSubject<Character>(new Character());
  gemLogic!: GemAlterationInterface;

  constructor() { }
}
