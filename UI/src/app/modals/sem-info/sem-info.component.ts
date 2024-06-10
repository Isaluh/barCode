import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';

type modalSemInfoVariant = "cadastro" | "relatorio" | "adicionarMesa"

@Component({
  selector: 'semInfoModal',
  standalone: true,
  imports: [NgIf, InputsComponent, ButtonsComponent],
  templateUrl: './sem-info.component.html',
  styleUrl: './sem-info.component.css'
})
export class SemInfoComponent {
  @Input() variant : modalSemInfoVariant = "adicionarMesa";
  @Output() adicionarMesa = new EventEmitter();
  @Output() criarCadastro = new EventEmitter();
  @Output() valorInput = new EventEmitter();
  @Output() sairModals = new EventEmitter();

  numeroMesaNova(numero : string | number){
    this.valorInput.emit(numero)
  }
  criarMesa(){
    this.adicionarMesa.emit()
  }

  inputs = {
    "cpf" : "",
    "nome" : "",
    "senha" : "",
  }
  pegarCPF(cpf : string | number ){
    this.inputs.cpf = String(cpf);
    this.valorInput.emit(this.inputs);
  }
  pegarNome(nome : string | number){
    this.inputs.nome = String(nome);
    this.valorInput.emit(this.inputs);
  }
  pegarSenha(senha : string | number){
    this.inputs.senha = String(senha);
    this.valorInput.emit(this.inputs);
  }

  cadastrar(){
    this.criarCadastro.emit()
  }

  fecharModal(){
    this.sairModals.emit()
  }
}
