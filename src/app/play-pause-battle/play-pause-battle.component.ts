import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

enum BattleState {
  Play = 'play',
  Pause = 'pause'
}

@Component({
  selector: 'app-play-pause-battle',
  templateUrl: './play-pause-battle.component.html',
  styleUrls: ['./play-pause-battle.component.scss']
})

export class PlayPauseBattleComponent implements OnInit {
  isInPause = true;
  icon: string = BattleState.Play;

  @Output() start = new EventEmitter();
  @Output() pause = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.isInPause = !this.isInPause
    this.icon = this.isInPause
      ? BattleState.Play
      : BattleState.Pause;
    if(!this.isInPause) this.start.emit();
    else this.pause.emit();
  }
}
