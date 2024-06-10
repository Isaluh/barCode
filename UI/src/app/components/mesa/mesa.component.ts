import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'mesaComponent',
  standalone: true,
  imports: [NgOptimizedImage, NgIf],
  templateUrl: './mesa.component.html',
  styleUrl: './mesa.component.css'
})
export class MesaComponent {
  @Input() variant : string = "";
  @Input("numMesa") "numMesa" : string;
}
