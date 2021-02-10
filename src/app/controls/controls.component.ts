import { Component, OnInit } from '@angular/core';
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
