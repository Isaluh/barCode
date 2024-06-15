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
  topicos : Categorias[] = []

  constructor(private cardapioService : CardapioService){}

  ngOnInit(){
    this.getTopicosCardapio()
    let cont = 0;
    for(let item of this.topicos){
      console.log(item.categoria)
      this.topicosCardapio[cont].topico = String(item)
      cont++
    }
  }

  getTopicosCardapio(): void {
    this.cardapioService.getTopicosCardapio()
      .subscribe(categoria => this.topicos = categoria);
  }

  topicosCardapio = [
    {
      "topico" : "",
      "status" : "selecionado",
      "visivel" : true
    },
    {
      "topico" : "",
      "status" : "",
      "visivel" : true
    },
    {
      "topico" : "",
      "status" : "",
      "visivel" : true
    },
    {
      "topico" : "",
      "status" : "",
      "visivel" : true
    },
    {
      "topico" : "",
      "status" : "",
      "visivel" : false
      
    },
    {
      "topico" : "",
      "status" : "",
      "visivel" : false
    },
    {
      "topico" : "",
      "status" : "",
      "visivel" : false
    }
  ]

  selecionarTopico(topicoSelecionado : string){
    for(let topico of this.topicosCardapio){
      topico.status = "";
      if(topicoSelecionado == topico.topico){
        topico.status = "selecionado";
      }
    }
    console.log(this.topicosCardapio)
    this.topicoProduto.emit(topicoSelecionado)
  }

  anterior(){
    if(this.topicosCardapio[6].visivel == true){
      this.topicosCardapio[6].visivel = false;
      this.topicosCardapio[2].visivel = true;
    }
    else if(this.topicosCardapio[5].visivel == true){
      this.topicosCardapio[5].visivel = false;
      this.topicosCardapio[1].visivel = true;
    }
    else if(this.topicosCardapio[4].visivel == true){
      this.topicosCardapio[4].visivel = false;
      this.topicosCardapio[0].visivel = true;
    }
  }

  proximo(){
    if(this.topicosCardapio[0].visivel == true){
      this.topicosCardapio[0].visivel = false;
      this.topicosCardapio[4].visivel = true;
    }
    else if(this.topicosCardapio[1].visivel == true){
      this.topicosCardapio[1].visivel = false;
      this.topicosCardapio[5].visivel = true;
    }
    else if(this.topicosCardapio[2].visivel == true){
      this.topicosCardapio[2].visivel = false;
      this.topicosCardapio[6].visivel = true;
    }
  }
}
