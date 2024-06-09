import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type btnVariant = "neutro" | "verde" | "laranja" | "borda" | "search";

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
