import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Race, Races } from '../character/races/race';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService) { }


  ngOnInit(): void {
  }

  save() {
    this.sharedDataService.saveCharacter();
  }
  load() {
    this.sharedDataService.loadCharacter();
  }
}
