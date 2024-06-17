import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { MesaComponent } from '../../components/mesa/mesa.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { NgFor, NgIf } from '@angular/common';
import { ExclusaoComponent } from '../../modals/exclusao/exclusao.component';
import { InfoBarSimplesComponent } from '../../modals/info-bar-simples/info-bar-simples.component';
import { Router } from '@angular/router';
import { Mesa } from '../../../models/models';
import { MesasService } from '../../../services/mesas.service';
import { SemInfoComponent } from '../../modals/sem-info/sem-info.component';
import { MensagemComponent } from '../../components/mensagem/mensagem.component';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'mesasView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent, MesaComponent, ButtonsComponent, InputsComponent, NgFor, ExclusaoComponent, NgIf, InfoBarSimplesComponent, SemInfoComponent, MensagemComponent],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {
  mesas : Mesa[] = [];
  numeroAddMesa : number = 0;
  numeroMesa : number = 0;
  qntdPessoas : number = 0;
  msgErro : string = "";
  abrirMensagem = false
  
  constructor(private localStorageService : LocalStorageService, private router : Router, private mesasService : MesasService){}
  
  ngOnInit(): void {
    if(this.localStorageService.getLogin().usuario == null && this.localStorageService.getLogin().senha == null){
      this.router.navigate(["/login"])
    }
    else if(this.localStorageService.getLogin().acessLevel != 'GARCOM'){
      this.router.navigate([this.localStorageService.getLogin().rota])
    }
    this.getMesas();
  }
  
  getMesas(): void {
    this.mesasService.getMesas()
    .subscribe(mesas => this.mesas = mesas.sort((a, b) => a.numero - b.numero));
  }
  
  modalAbrirMesa = false;
  abrirMesa(numero : number){
    this.numeroMesa = numero;
    this.modalAbrirMesa = true;
  }
  statusAberto(){
    if(this.qntdPessoas < 1){
      this.msgErro = "Quantidade inválida"
      this.abrirMensagem = true
      return
    }
    this.mesasService.setQntdMesa(this.numeroMesa, this.qntdPessoas).subscribe(
      (res) => {
        for(let mesa of this.mesas){
          console.log(mesa.numero + " " + this.numeroMesa)
          if(mesa.numero == this.numeroMesa){
            mesa.statusName = 'ocupada';
            mesa.statusCode = 1;
            break
          };
        };
        this.numeroMesa = 0;
        this.qntdPessoas = 0;
      }
    );
    this.fecharModal();
  }
  pegarQntsPessoas(qntdPessoas : number){
    this.qntdPessoas = qntdPessoas;
  }

  modalOcuparMesa = false;
  ocuparMesa(numero : number){
    this.numeroMesa = numero;
    this.modalOcuparMesa = true;
  }
  statusOcupada(){
    this.mesasService.fecharMesa(this.numeroMesa).subscribe(
      (res) => {
        for(let mesa of this.mesas){
          if(mesa.numero == this.numeroMesa){
            mesa.statusName = 'aPagar';
            mesa.statusCode = 2;
            break
          };
        };
        this.numeroMesa = 0;
      }
    );
    this.fecharModal();
  }
  // remover mesas
  abrirCardapio(){
    this.router.navigate(['/cardapio', this.numeroMesa])
  }
  abrirComanda(numero : number){
    this.router.navigate(['/comanda', numero])
  }

  modalAddMesa = false;
  adicionarMesa(){
    this.modalAddMesa = true;
  }
  pegarNumeroAddMesa(numero : number){
    this.numeroAddMesa = numero;
  }
  criarMesa(){
    if(this.numeroAddMesa <= 0){
      this.msgErro = "Número inválido"
      this.abrirMensagem = true
      return
    }
    // se numero ja existir em mesas mandar um erro
    this.mesasService.adicionarMesa(this.numeroAddMesa).subscribe(
      (res) => {
        let mesa : Mesa = {
          "numero" : this.numeroAddMesa,
          "statusName" : 'livre',
          "statusCode" : 0
        }
        this.mesas.push(mesa)
        this.mesas.sort((a, b) => a.numero - b.numero)
        this.numeroAddMesa = 0;
      }
    );
    this.fecharModal()
  }

  modalExlusao = false;
  // apenas excluir se a mesa for livre
  removerMesa(){
    if(this.mesas.length == 0){
      // lançar aviso
      console.log("não ha nenhuma mesa")
    }
    // fazer a escolha da mesa antes de abrir modal
    console.log("escolher a mesa antes");
    this.modalExlusao = true;
  }
  salvarModal(){
    // fazer a exlusão
    console.log("exclui");
    this.fecharModal();
  }
  fecharModal(){
    this.abrirMensagem = false;
    this.modalExlusao = false;
    this.modalAbrirMesa = false;
    this.modalOcuparMesa = false;
    this.modalAddMesa = false;
  }

}
