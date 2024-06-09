import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  urlBase : string = ProdutosService.API_url + "/";
  // add img dps
}
