import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mesa, Produto, Usuario } from '../../../models/models';
import { ProdutosService } from '../../../services/produtos.service';

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
  @Input() usuarios : Usuario[] = [];
  @Input() produtos : Produto[] = [];
  @Input() mesas : Mesa[] = [];
  @Output() pegarValorFiltro = new EventEmitter();

  valorFiltro(value : string){
    this.pegarValorFiltro.emit(value)
  }
}
