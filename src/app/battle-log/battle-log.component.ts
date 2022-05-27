import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../battle/domain/pokemon";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.scss']
})
export class BattleLogComponent implements OnInit {
  @Input() winner?: Pokemon;
  @Input() startDate : Date|null = null;
  @Input() history: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
