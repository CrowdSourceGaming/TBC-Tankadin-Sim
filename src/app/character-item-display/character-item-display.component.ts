import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item/item';

@Component({
  selector: 'app-character-item-display',
  templateUrl: './character-item-display.component.html',
  styleUrls: ['./character-item-display.component.scss']
})
export class CharacterItemDisplayComponent implements OnInit {

  constructor() { }

  @Input()
  item!: Item

  @Input()
  backgroundUrl!: string;

  ngOnInit(): void {
  }

}
