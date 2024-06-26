import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

type btnVariant = "neutro" | "verde" | "laranja" | "vermelho" | "borda" | "search" | "pagamento";

@Component({
  selector: 'buttonsComponent',
  standalone: true,
  imports: [NgIf, NgOptimizedImage],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() variant : btnVariant = "neutro";
  @Input("text") "text" : string = "";
  @Input("type") "type" : string = "";
}
