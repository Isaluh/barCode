import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

type inputVariant = "neutro" | "borda" | "visual" | "visualMesas" | "visualTotal" | "visualUsuario" | "visualTroco";

@Component({
  selector: 'inputsComponent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css'
})
export class InputsComponent {
  @Input("type") type: string = "";
  @Input() variant: inputVariant = "neutro";
  @Input("placeholder") placeholder : string = "";
  @Output() eventInputValue = new EventEmitter<{valorinput : string}>();
  
  valorInput : string | number = "";

  mandarValores(){
    this.eventInputValue.emit({valorinput : String(this.valorInput)});
  };
}
