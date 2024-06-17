import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { NgIf } from '@angular/common';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { MensagemComponent } from '../../components/mensagem/mensagem.component';

type modalInfoBarSimplesVariant = "aberta" | "ocupada" | "aPagar" | "aPagarDinheiro";

@Component({
  selector: 'infoBarSimplesModal',
  standalone: true,
  imports: [InfoBarComponent, NgIf, InputsComponent, ButtonsComponent, MensagemComponent],
  templateUrl: './info-bar-simples.component.html',
  styleUrl: './info-bar-simples.component.css'
})
export class InfoBarSimplesComponent {
  @Input() variant : modalInfoBarSimplesVariant = "aberta";
  @Input() numeroMesa : number = 0;
  @Input() msgErro : string = "";
  @Input() abrirMensagem = false;
  @Input() totalComanda = 0;
  @Output() mudarStatus  =  new EventEmitter();
  @Output() modalDinheiro = new EventEmitter();
  @Output() valorInput = new EventEmitter();
  @Output() cardapioMesa = new EventEmitter()
  @Output() sairModals = new EventEmitter();
  @Output() poderPagar = new EventEmitter();

  troco : number = 0;

  mudarStatuAbrir(){
    this.mudarStatus.emit();
  };

  mudarStatusOcupada(){
    this.mudarStatus.emit();
  };

  mudarStatusAPagar(metodo : string){
    this.mudarStatus.emit(metodo);
  };

  abrirModalDinheiro(){
    this.modalDinheiro.emit();
  };

  pegarQntsPessoas(event : string | number){
    this.valorInput.emit(Number(event));
  };

  pegarRecebido(valor : string){
    this.troco = Number(valor) - this.totalComanda;
    if(this.troco >= 0){
      this.poderPagar.emit(true);
    }
    else{
      this.poderPagar.emit(false);
    };
  };

  abrirCardapio(){
    this.cardapioMesa.emit();
  };

  fecharModal(){
    this.sairModals.emit();
  };
}
