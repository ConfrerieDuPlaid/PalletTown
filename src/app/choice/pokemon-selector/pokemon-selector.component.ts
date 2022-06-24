import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from "../../pokemon/pokemon";

@Component({
  selector: 'app-pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.scss']
})
export class PokemonSelectorComponent implements OnInit {

  pokemons = ['pikachu', 'pidgey', 'charmander']
  @Input() fieldName = '';
  @Input() fieldId = 0;
  @Output() selectFighter = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectFighter(event: Event) {
    const radio = event.target as HTMLTextAreaElement;
    this.selectFighter.emit(radio.value);
  }
}
