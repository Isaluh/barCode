import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

type inputVariant = "neutro" | "borda" | "visual" | "visualMesas" | "visualTotal";

@Component({
  selector: 'inputsComponent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css'
})
export class InputsComponent {
  valorInput : string | number = "";

  @Input("type") type: string = "";
  @Input() variant: inputVariant = "neutro";
  @Input("placeholder") placeholder : string = "";

  @Output() eventInputValue = new EventEmitter<{valorinput : string | number}>();

  mandarValores(){
    this.eventInputValue.emit({valorinput : this.valorInput})
  }
}
