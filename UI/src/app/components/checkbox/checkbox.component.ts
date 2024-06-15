import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'checkboxComponent',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  @Output() eventCheckbox = new EventEmitter;

  mesaSelect(){
    this.eventCheckbox.emit('mesa')
  }

  produtoSelect(){
    this.eventCheckbox.emit('produto')
  }
}
