import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-stats-totals',
  templateUrl: './stats-totals.component.html',
  styleUrls: ['./stats-totals.component.scss']
})
export class StatsTotalsComponent implements OnInit {

  constructor(private SharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.SharedDataService.character
  }

}
