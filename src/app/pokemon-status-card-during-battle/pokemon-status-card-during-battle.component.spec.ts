import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokemonStatusCardDuringBattleComponent} from './pokemon-status-card-during-battle.component';
import {Pokemon} from "../domain/pokemon";
import {PokemonType} from "../domain/pokemon.type";

describe('PokemonStatusCardDuringBattleComponent', () => {
  let component: PokemonStatusCardDuringBattleComponent;
  let fixture: ComponentFixture<PokemonStatusCardDuringBattleComponent>;

  const pikachu: Pokemon = new Pokemon({
    maxHp: 89,
    type: PokemonType.Electric,
    name: "Pikachu"
  })

  const pidgey: Pokemon = new Pokemon({
    maxHp: 78,
    type: PokemonType.Wind,
    name: "Pidgey"
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonStatusCardDuringBattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatusCardDuringBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name Pikachu when given pikachu', () => {
    component.pokemon = pikachu;
    fixture.detectChanges();
    const view = fixture.debugElement.nativeElement;
    expect(view.innerHTML).toContain('Pikachu');
  })

  it('should display the name Pidgey when given pidgey', () => {
    component.pokemon = pidgey;
    fixture.detectChanges();
    const view = fixture.debugElement.nativeElement;
    expect(view.innerHTML).toContain('Pidgey');
  })

  it('should display the hp of Pikachu when it has 89/89 hp', () => {
    component.pokemon = pikachu;
    fixture.detectChanges();
    const view = fixture.debugElement.nativeElement;
    expect(view.innerHTML).toContain('89/ 89');
  })


});
