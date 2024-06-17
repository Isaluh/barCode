import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FiltroComponent } from '../filtro/filtro.component';
import { Mesa, Produto, Usuario } from '../../../models/models';

type infoBarVariant = "infoMesas" | "infoMesaCompleto" | "infoMesa" | "filtroDate" | "filtroNome"

@Component({
  selector: 'infoBarComponent',
  standalone: true,
  imports: [NgOptimizedImage, NgIf, FiltroComponent],
  templateUrl: './info-bar.component.html',
  styleUrl: './info-bar.component.css'
})
export class InfoBarComponent {
  @Input() variant : infoBarVariant = "infoMesas";
  @Input() numeroMesa : number = 0;
  @Input() usuarios : Usuario[] = [];
  @Input() produtos : Produto[] = [];
  @Output() passarFiltro = new EventEmitter();

  filtro = {
    "ano" : "",
    "mes" : "",
    "dia" : ""
  }

  // fazer a tabela mudar conforme o filtro selecionado
  pegarAno(ano : string){
    this.filtro.ano = ano
    this.passarFiltro.emit(this.filtro)
  }

  pegarMes(mes : string){
    this.filtro.mes = mes
    this.passarFiltro.emit(this.filtro)
  }

  pegarDia(dia : string){
    this.filtro.dia = dia
    this.passarFiltro.emit(this.filtro)
  }

  // fazer a tabela mudar conforme o filtro selecionado
  pegarNome(nome : string){
    this.passarFiltro.emit(nome)
  }
}
