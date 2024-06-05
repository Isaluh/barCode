import { Component, Input } from '@angular/core';

type btnVariant = "neutro" | "verde" | "laranja";

@Component({
  selector: 'buttonsComponent',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() variant : btnVariant = "neutro";
  @Input("text") "text" : string = "";
}
