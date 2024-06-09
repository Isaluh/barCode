import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'itemCardapioComponent',
  standalone: true,
  imports: [NgOptimizedImage, NgIf],
  templateUrl: './item-cardapio.component.html',
  styleUrl: './item-cardapio.component.css'
})
export class ItemCardapioComponent {
  @Input("nome") "nome" : string = "";
  @Input("valor") "valor" : string = "";
  // add img dps
}
