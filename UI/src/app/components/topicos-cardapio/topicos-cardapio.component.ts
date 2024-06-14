import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import Swipe from 'swipejs';

@Component({
  selector: 'topicosCardapioComponent',
  standalone: true,
  imports: [CarouselModule, NgFor],
  templateUrl: './topicos-cardapio.component.html',
  styleUrl: './topicos-cardapio.component.css'
})
export class TopicosCardapioComponent {
  @Output() topicoProduto = new EventEmitter();
  // pegar os topicos no banco
  topicosCardapio = [
    {
      "topico" : "Porções",
      "status" : "selecionado"
    },
    {
      "topico" : "Petiscos",
      "status" : ""
    },
    {
      "topico" : "Peixes",
      "status" : ""
    },
    {
      "topico" : "Carnes",
      "status" : ""
    },
    {
      "topico" : "Saladas",
      "status" : ""
    },
    {
      "topico" : "Bebidas",
      "status" : false
    },
    {
      "topico" : "Sobremesas",
      "status" : false
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

}
