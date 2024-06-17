import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';

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
  @Input("urlImg") "urlImg" : string = "";
  @Input() isGarcom : boolean = false;
  @Output() produtoEscolhido = new EventEmitter()

  urlBase : string = ProdutosService.API_url;

  adicionarProduto(produto : string){
    this.produtoEscolhido.emit(produto)
  }
}
