import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'topicosCardapioComponent',
  standalone: true,
  imports: [NgFor, NgOptimizedImage, NgIf],
  templateUrl: './topicos-cardapio.component.html',
  styleUrl: './topicos-cardapio.component.css'
})
export class TopicosCardapioComponent {
  @Output() topicoProduto = new EventEmitter();
  // pegar os topicos no banco

  topicosCardapio = [
    {
      "topico" : "Porções",
      "status" : "selecionado",
      "visivel" : true
    },
    {
      "topico" : "Petiscos",
      "status" : "",
      "visivel" : true
    },
    {
      "topico" : "Peixes",
      "status" : "",
      "visivel" : true
    },
    {
      "topico" : "Carnes",
      "status" : "",
      "visivel" : true
    },
    {
      "topico" : "Saladas",
      "status" : "",
      "visivel" : false
      
    },
    {
      "topico" : "Bebidas",
      "status" : "",
      "visivel" : false
    },
    {
      "topico" : "Sobremesas",
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
