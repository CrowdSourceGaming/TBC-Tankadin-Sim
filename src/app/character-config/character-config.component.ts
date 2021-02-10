import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Race, Races } from '../character/races/race';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-character-config',
  templateUrl: './character-config.component.html',
  styleUrls: ['./character-config.component.scss']
})
export class CharacterConfigComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService) { }

  RaceValues = Object.values(Races);
  currentRaceValue: string = '';

  ngOnInit(): void {
    this.sharedDataService.character.subscribe(character => {
      this.currentRaceValue = character.race.name
    })
  }

  raceChange(event: MatSelectChange) {
    console.log()
    const character = this.sharedDataService.character.value
    character.race = new Race(event.value)
    this.sharedDataService.character.next(character);
  }

}
