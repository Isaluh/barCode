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
  aMostraProdutos :Produto[] = [];
  searchProduto : string = "";
  upPage : boolean = false;
  
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
    this.getProdutosPorcoes();
    this.aMostraProdutos = this.produtos
  }
  
  getProdutosPorcoes(): void {
    this.produtosService.getProdutosPorcoes()
      .subscribe(produtos => this.produtos = produtos);
  }

  getProdutosPetiscos(): void {
    this.produtosService.getProdutosPetiscos()
      .subscribe(produtos => this.produtos = produtos);
  }

  getProdutosPeixes(): void {
    this.produtosService.getProdutosPeixes()
      .subscribe(produtos => this.produtos = produtos);
  }

  getProdutosCarnes(): void {
    this.produtosService.getProdutosCarnes()
      .subscribe(produtos => this.produtos = produtos);
  }

  getProdutosSaladas(): void {
    this.produtosService.getProdutosSaladas()
      .subscribe(produtos => this.produtos = produtos);
  }

  getProdutosBebidas(): void {
    this.produtosService.getProdutosBebidas()
      .subscribe(produtos => this.produtos = produtos);
  }

  getProdutosSobremesas(): void {
    this.produtosService.getProdutosSobremesas()
      .subscribe(produtos => this.produtos = produtos);
  }

  pegarTopico(topico : string){
    this.produtos = []
    this.aMostraProdutos = []
    if(topico == 'Porções'){
      this.getProdutosPorcoes()
    }
    else if(topico == 'Petiscos'){
      this.getProdutosPetiscos()
    }
    else if(topico == 'Peixes'){
      this.getProdutosPeixes()
    }
    else if(topico == 'Carnes'){
      this.getProdutosCarnes()
    }
    else if(topico == 'Saladas'){
      this.getProdutosSaladas()
    }
    else if(topico == 'Bebidas'){
      this.getProdutosBebidas()
    }
    else{
      this.getProdutosSobremesas()
    }
    this.aMostraProdutos = this.produtos
  }

  pegarSearch(produto : string | number){
    this.searchProduto = String(produto);
  }

  produtoSearch(){
    console.log("procurar produto " + this.searchProduto)
    for(let item of this.aMostraProdutos){
      if(String(item.nome).toLowerCase() == this.searchProduto.toLowerCase()){
        // colocar produto a mostra
        this.aMostraProdutos = []
        this.aMostraProdutos.push(item)
      }
    }
    // procurar pelo produto no banco de dados do produto e fazer com q so ele ou parecidos apareçam na tela
    // limpar barra de pesquisa
  }

  adicionarProduto(produto : string){
    // mandar pro back colocar na comanda
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

