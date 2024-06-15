import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { TopicosCardapioComponent } from '../../components/topicos-cardapio/topicos-cardapio.component';
import { ItemCardapioComponent } from '../../components/item-cardapio/item-cardapio.component';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/models';
import { CardapioService } from '../../../services/cardapio.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  id: string | null = '';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = document.documentElement.scrollTop;
    if (scrollPosition > 600) {
      this.upPage = true;
    } else {
      this.upPage = false;
    }
  }

  constructor(private produtosService: ProdutosService, private cardapioService : CardapioService, private route: ActivatedRoute, private router : Router){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
  }

  getProdutos(categoria: string): void {
    this.produtosService.getProdutos(categoria)
      .subscribe(produtos => {
        this.produtos = produtos
        this.aMostraProdutos = this.produtos
      });
  }

  pegarTopico(topico: string) {
    this.produtos = []
    this.aMostraProdutos = []
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
    this.cardapioService.addProdutoComanda(Number(this.id), produto).subscribe(() => {})
    console.log("adicionar produto " + produto)
  }

  subirPag() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  verComanda() {
    this.router.navigate(['/comanda', this.id])
    console.log("mostrar comanda")
  }
}

