import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { FiltroComponent } from '../../components/filtro/filtro.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';

type modalSemInfoVariant = "cadastro" | "relatorio" | "unicoInput"

@Component({
  selector: 'semInfoModal',
  standalone: true,
  imports: [NgIf, InputsComponent, ButtonsComponent, FiltroComponent, CheckboxComponent],
  templateUrl: './sem-info.component.html',
  styleUrl: './sem-info.component.css'
})
export class SemInfoComponent {
  @Input() variant : modalSemInfoVariant = "unicoInput";
  @Input() textButton : string = "";
  @Input() placeholderInput : string = "";
  @Output() eventButton = new EventEmitter();
  @Output() criarCadastro = new EventEmitter();
  @Output() criarRelatorio = new EventEmitter();
  @Output() valorInput = new EventEmitter();
  @Output() sairModals = new EventEmitter();

  pegarInput(numero : string | number){
    this.valorInput.emit(numero)
  }
  pegarValorInput(){
    this.eventButton.emit()
  }

  cadastro = {
    "cpf" : "",
    "nome" : "",
    "senha" : "",
  }
  pegarCPF(cpf : string | number ){
    this.cadastro.cpf = String(cpf);
    this.valorInput.emit(this.cadastro);
  }
  pegarNome(nome : string | number){
    this.cadastro.nome = String(nome);
    this.valorInput.emit(this.cadastro);
  }
  pegarSenha(senha : string | number){
    this.cadastro.senha = String(senha);
    this.valorInput.emit(this.cadastro);
  }

  cadastrar(){
    this.criarCadastro.emit()
  }

  relatorio ={
    "inicio" : "",
    "fim" : ""
    // pegar opcao
    // pegar produto/mesa escolhida
  }
  pegarInicio(dataInicio : string | number){
    this.relatorio.inicio = String(dataInicio)
  }
  pegarFim(dataFim : string | number){
    this.relatorio.fim = String(dataFim)
  }

  gerarRelatorio(){
    this.criarRelatorio.emit(this.relatorio)
  }

  escolha : string = ""
  pegarEscolha(escolha : string){
    this.escolha = escolha
  }

  fecharModal(){
    this.sairModals.emit()
  }
}
