import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { FiltroComponent } from '../../components/filtro/filtro.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { MensagemComponent } from '../../components/mensagem/mensagem.component';

type modalSemInfoVariant = "cadastro" | "relatorio" | "unicoInput"

@Component({
  selector: 'semInfoModal',
  standalone: true,
  imports: [NgIf, InputsComponent, ButtonsComponent, FiltroComponent, CheckboxComponent, MensagemComponent],
  templateUrl: './sem-info.component.html',
  styleUrl: './sem-info.component.css'
})
export class SemInfoComponent {
  @Input() variant : modalSemInfoVariant = "unicoInput";
  @Input() textButton : string = "";
  @Input() placeholderInput : string = "";
  @Input() msgErro : string = "";
  @Input() abrirMensagem : boolean = false;
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
    "fim" : "",
    "escolha" : "",
    "value" : ""
  }
  pegarInicio(dataInicio : string | number){
    this.relatorio.inicio = String(dataInicio)
  }
  pegarFim(dataFim : string | number){
    this.relatorio.fim = String(dataFim)
  }
  
  pegarEscolha(escolha : string){
    this.relatorio.escolha = escolha
  }
  
  pegarMesa(mesa : string){
    this.relatorio.value = mesa
  }
  
  pegarProduto(produto : string){
    this.relatorio.value = produto
  }
  
  gerarRelatorio(){
    this.criarRelatorio.emit(this.relatorio)
  }

  fecharModal(){
    this.sairModals.emit()
  }
}
