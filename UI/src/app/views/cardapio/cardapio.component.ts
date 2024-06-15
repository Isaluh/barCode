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
  produtos: Produto[] = [];
  aMostraProdutos: Produto[] = [];
  searchProduto: string = "";
  upPage: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = document.documentElement.scrollTop;
    if (scrollPosition > 600) {
      this.upPage = true;
    } else {
      this.upPage = false;
    }
  }

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {

  }

  getProdutos(categoria: string): void {
    console.log("teste")
    this.produtosService.getProdutos(categoria)
      .subscribe(produtos => {
        this.produtos = produtos
        this.aMostraProdutos = this.produtos
      });
  }

  pegarTopico(topico: string) {
    this.produtos = []
    this.aMostraProdutos = []

    console.log("FOI EMITIDO " + topico)
    this.getProdutos(topico)
  }

  pegarSearch(produto: string | number) {
    this.searchProduto = String(produto);
  }

  produtoSearch() {
    console.log("procurar produto " + this.searchProduto)
    this.aMostraProdutos = []
    for (let item of this.produtos) {
      if (this.checkaSeCondizPesquisa(this.searchProduto, item.nome)) {
        this.aMostraProdutos.push(item)
      }
    }
  }

  checkaSeCondizPesquisa(padrao:string, nome:string) {
    if (nome == "") {
      return true;
    }
    const buscaSemAcentos = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const padraoSemAcenetos = padrao.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const regex = new RegExp(padraoSemAcenetos, 'i');
    return regex.test(buscaSemAcentos);
  }

  adicionarProduto(produto: string) {
    // mandar pro back colocar na comanda
    console.log("adicionar produto " + produto)
  }

  subirPag() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  verComanda() {
    // mostrar comanda porem sem o metodo de pagar
    console.log("mostrar comanda")
  }
}

