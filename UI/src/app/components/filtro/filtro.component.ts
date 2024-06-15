import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type filtroVariant = "data" | "nome" | "produto" | "mesa"
type filtroVariantDate = "ano" | "mes" | "dia"

@Component({
  selector: 'filtroComponent',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  @Input("placeholder") "placeholder" : string = "";
  @Input() variant : filtroVariant = "data";
  @Input() variantDate : filtroVariantDate = "ano"
  @Output() pegarValorFiltro = new EventEmitter();

  valorFiltro(value : string){
    this.pegarValorFiltro.emit(value)
  }
}
