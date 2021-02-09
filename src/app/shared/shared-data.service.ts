import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../character/character';
import { StatsDataService } from './stats-data.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  character: Character = new Character();

  constructor() { }

}
