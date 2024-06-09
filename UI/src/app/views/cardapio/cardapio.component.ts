import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { TopicosCardapioComponent } from '../../components/topicos-cardapio/topicos-cardapio.component';
import { ItemCardapioComponent } from '../../components/item-cardapio/item-cardapio.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'cardapioView',
  standalone: true,
  imports: [HeaderComponent, InputsComponent, ButtonsComponent, TopicosCardapioComponent, ItemCardapioComponent, NgFor],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent {
  searchProduto : string = "";

  pegarSearch(produto : string | number){
    this.searchProduto = String(produto);
  }

  produtoSearch(){
    console.log("procurar produto " + this.searchProduto)
    // procurar pelo produto no banco de dados do produto e fazer com q so ele ou parecidos apareçam na tela
    // limpar barra de pesquisa
  }
}
