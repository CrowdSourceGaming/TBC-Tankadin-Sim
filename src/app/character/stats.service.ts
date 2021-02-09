import { Injectable } from '@angular/core';
import { SharedDataService } from '../shared/shared-data.service';
import { ItemStats } from './item-stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private sharedDataService: SharedDataService) { }

  getTotalStat(stat: ItemStats){

  }

  private getMultipliers(stat: ItemStats){

  }

  private getValues(stat: ItemStats){

  }
}
