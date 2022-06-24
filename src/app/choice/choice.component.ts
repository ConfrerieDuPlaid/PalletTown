import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  firstFighter = '';
  secondFighter = '';

  readyToFight = false;

  constructor() { }

  ngOnInit(): void {
    this.updateReadyToFight();
  }

  setFirstFighter(fighter: string) {
    this.firstFighter = fighter;
    this.updateReadyToFight();
  }

  setSecondFighter(fighter: string) {
    this.secondFighter = fighter;
    this.updateReadyToFight();
  }

  private updateReadyToFight() {
    this.readyToFight = this.firstFighter.trim().length > 0
      && this.secondFighter.trim().length > 0;
  }
}
