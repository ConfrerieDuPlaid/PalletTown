import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.scss']
})
export class BattleLogComponent implements OnInit {
  @Input() history: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
