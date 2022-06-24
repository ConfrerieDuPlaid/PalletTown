import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPauseBattleComponent } from './play-pause-battle.component';

describe('PlayPauseBattleComponent', () => {
  let component: PlayPauseBattleComponent;
  let fixture: ComponentFixture<PlayPauseBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayPauseBattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayPauseBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
