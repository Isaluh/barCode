import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { NgIf } from '@angular/common';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';

type modalInfoBarSimplesVariant = "aberta" | "ocupada" | "aPagar" | "aPagarDinheiro";

@Component({
  selector: 'infoBarSimplesModal',
  standalone: true,
  imports: [InfoBarComponent, NgIf, InputsComponent, ButtonsComponent],
  templateUrl: './info-bar-simples.component.html',
  styleUrl: './info-bar-simples.component.css'
})
export class InfoBarSimplesComponent {
  @Input() variant : modalInfoBarSimplesVariant = "aberta";
  @Input() numeroMesa : number = 0;
  @Output() mudarStatus  =  new EventEmitter();
  @Output() modalDinheiro = new EventEmitter();
  @Output() valorInput = new EventEmitter();
  @Output() cardapioMesa = new EventEmitter()
  @Output() sairModals = new EventEmitter();

  mudarStatuAbrir(){
    this.mudarStatus.emit()
  }

  mudarStatusOcupada(){
    this.mudarStatus.emit()
  }

  mudarStatusAPagar(){
    this.mudarStatus.emit()
  }

  abrirModalDinheiro(){
    this.modalDinheiro.emit()
  }

  pegarQntsPessoas(event : string | number){
    this.valorInput.emit(Number(event))
  }

  abrirCardapio(){
    this.cardapioMesa.emit()
  }

  fecharModal(){
    this.sairModals.emit()
  }
}
