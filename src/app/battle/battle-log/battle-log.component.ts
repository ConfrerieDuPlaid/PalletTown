import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../../pokemon/pokemon";
import {DatePipe} from "@angular/common";
import {LogService} from "./logger/log.service";

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.scss']
})
export class BattleLogComponent implements OnInit {
  @Input() winner?: Pokemon;
  @Input() loser?: Pokemon;
  @Input() startDate : Date|null = null;
  @Input() history: string[] = [];

  constructor(
    public logService: LogService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

}
