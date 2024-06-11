import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { TopicosCardapioComponent } from '../../components/topicos-cardapio/topicos-cardapio.component';
import { ItemCardapioComponent } from '../../components/item-cardapio/item-cardapio.component';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/models';

@Component({
  selector: 'cardapioView',
  standalone: true,
  imports: [HeaderComponent, InputsComponent, ButtonsComponent, TopicosCardapioComponent, ItemCardapioComponent, NgFor, NgOptimizedImage, NgIf],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent {
  produtos : Produto[] = [];
  searchProduto : string = "";
  upPage : boolean = false

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = document.documentElement.scrollTop;
    if (scrollPosition > 600) { 
      this.upPage = true;
    } else {
      this.upPage = false;
    }
  }

  constructor(private produtosService : ProdutosService){}

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtosService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }

  pegarTopico(topico : string){
    // listar so produtos do topico passado
    console.log("topico passado " + topico)
  }

  pegarSearch(produto : string | number){
    this.searchProduto = String(produto);
  }

  produtoSearch(){
    console.log("procurar produto " + this.searchProduto)
    // procurar pelo produto no banco de dados do produto e fazer com q so ele ou parecidos apareçam na tela
    // limpar barra de pesquisa
  }

  adicionarProduto(produto : string){
    // colcocar tudo em uma lista, verificar se ja foi adicionado outra vez e passar pra comanda
    console.log("adicionar produto " + produto)
  }

  subirPag(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  verComanda(){
    // mostrar comanda porem sem o metodo de pagar
    console.log("mostrar comanda")
  }
}

