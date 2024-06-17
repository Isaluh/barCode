import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CardapioService } from '../../../services/cardapio.service';
import { Categorias } from '../../../models/models';

@Component({
  selector: 'topicosCardapioComponent',
  standalone: true,
  imports: [NgFor, NgOptimizedImage, NgIf],
  templateUrl: './topicos-cardapio.component.html',
  styleUrl: './topicos-cardapio.component.css'
})
export class TopicosCardapioComponent {
  @Output() topicoProduto = new EventEmitter();

  topicos : Categorias[] = [];
  offset: number = 0;
  itemsPorPagina: number = 4;

  constructor(private cardapioService : CardapioService){};

  ngOnInit(){
    this.getTopicosCardapio();
  };

  getTopicosCardapio(): void {
    this.cardapioService.getTopicosCardapio()
      .subscribe(
        categoria => {
          this.topicos = categoria;
          let cont = 0;
          for(let item of this.topicos){
            this.topicosCardapio.push({
              "topico": item,
              "status": "",
              "visivel": false 
            });
            if (cont == 0) {
              this.topicosCardapio[cont].status = "selecionado"; 
            };
            if (cont < 4) {
              this.topicosCardapio[cont].visivel = true;
            };
            cont++
          };
          this.selecionarTopico(this.topicosCardapio[0].topico);
        }
      );
  };

  topicosCardapio : any[] = [];

  selecionarTopico(topicoSelecionado : string){
    for(let topico of this.topicosCardapio){
      topico.status = "";
      if(topicoSelecionado == topico.topico){
        topico.status = "selecionado";
      }
    };
    this.topicoProduto.emit(topicoSelecionado);
  }

  anterior(){
    if (this.offset <= 0) {
      return;
    };
    let cont = --this.offset;
    for (let item of this.topicosCardapio) {
      item.visivel = false;
    };
    while (cont < this.offset + this.itemsPorPagina && cont < this.topicosCardapio.length) {
      this.topicosCardapio[cont].visivel = true;
      cont++;
    };
  };

  proximo(){
    if (this.offset >= this.topicosCardapio.length) {
      return;
    };
    let cont = ++this.offset;
    for (let item of this.topicosCardapio) {
      item.visivel = false;
    };
    while (cont < this.offset + this.itemsPorPagina && cont < this.topicosCardapio.length) {
      this.topicosCardapio[cont].visivel = true;
      cont++;
    };
  };
}
