import { Component, Input, input } from '@angular/core';

type inputVariant = "neutro" | "borda" | "visual" | "filtro";

@Component({
  selector: 'inputsComponent',
  standalone: true,
  imports: [],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css'
})
export class InputsComponent {
  @Input("type") type: string = "";
  @Input() variant: inputVariant = "neutro";
  @Input("placeholder") placeholder : string = "";
}
