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
  abrirMensagem = false;
  abrirMensagemForaModal = false;
  excluirMesas = false
  escolherMesas : Mesa[] = [];
  
  constructor(private localStorageService : LocalStorageService, private router : Router, private mesasService : MesasService){};
  
  ngOnInit(): void {
    if(this.localStorageService.getLogin().usuario == null && this.localStorageService.getLogin().senha == null){
      this.router.navigate(["/login"]);
    }
    else if(this.localStorageService.getLogin().acessLevel != 'GARCOM'){
      this.router.navigate([this.localStorageService.getLogin().rota]);
    };
    this.getMesas();;
  };
  
  getMesas(): void {
    this.mesasService.getMesas()
    .subscribe(mesas => this.mesas = mesas.sort((a, b) => a.numero - b.numero));
  };
  
  modalAbrirMesa = false;
  abrirMesa(numero : number){
    this.numeroMesa = numero;
    this.modalAbrirMesa = true;
  };
  statusAberto(){
    if(this.qntdPessoas < 1){
      this.msgErro = "Quantidade inválida";
      this.abrirMensagem = true;
      return;
    };
    this.mesasService.setQntdMesa(this.numeroMesa, this.qntdPessoas).subscribe(
      (res) => {
        for(let mesa of this.mesas){
          if(mesa.numero == this.numeroMesa){
            mesa.statusName = 'ocupada';
            mesa.statusCode = 1;
            break;
          };
        };
        this.numeroMesa = 0;
        this.qntdPessoas = 0;
      }
    );
    this.fecharModal();
  };
  pegarQntsPessoas(qntdPessoas : number){
    this.qntdPessoas = qntdPessoas;
  };

  modalOcuparMesa = false;
  ocuparMesa(numero : number){
    this.numeroMesa = numero;
    this.modalOcuparMesa = true;
  };
  statusOcupada(){
    this.mesasService.fecharMesa(this.numeroMesa).subscribe(
      (res) => {
        for(let mesa of this.mesas){
          if(mesa.numero == this.numeroMesa){
            mesa.statusName = 'aPagar';
            mesa.statusCode = 2;
            break;
          };
        };
        this.numeroMesa = 0;
      }
    );
    this.fecharModal();
  }

  abrirCardapio(){
    this.router.navigate(['/cardapio', this.numeroMesa]);
  };
  abrirComanda(numero : number){
    this.router.navigate(['/comanda', numero]);
  };

  modalAddMesa = false;
  adicionarMesa(){
    this.modalAddMesa = true;
  };
  pegarNumeroAddMesa(numero : number){
    this.numeroAddMesa = numero;
  };
  criarMesa(){
    if(this.numeroAddMesa <= 0){
      this.msgErro = "Número inválido";
      this.abrirMensagem = true;
      return;
    };
    for(let mesa of this.mesas){
      if(mesa.numero == this.numeroAddMesa){
        this.msgErro = "Mesa já existente";
        this.abrirMensagem = true;
        return;
      };
    };
    this.mesasService.adicionarMesa(this.numeroAddMesa).subscribe(
      (res) => {
        let mesa : Mesa = {
          "numero" : this.numeroAddMesa,
          "statusName" : 'livre',
          "statusCode" : 0
        };
        this.mesas.push(mesa);
        this.mesas.sort((a, b) => a.numero - b.numero);
        this.numeroAddMesa = 0;
      }
    );
    this.fecharModal();
  };

  modalExlusao = false;
  selecionarMesas(){
    if(this.mesas.length == 0){
      this.msgErro = "Não ha nenhuma mesa registrada";
      this.abrirMensagemForaModal = true
      return
    };
    this.excluirMesas = true
  };
  mesaExluir(numero : number){
    if(numero == 0){
      this.msgErro = "Apenas mesas livres"
      this.abrirMensagemForaModal = true
      setTimeout(() =>{
        this.abrirMensagemForaModal = false;
      }, 1000);
      return
    }
    for(let mesa of this.mesas){
      if(mesa.numero == numero){
        this.escolherMesas.push(mesa)
        console.log(this.escolherMesas)
        return
      }
    }
  }
  removerMesas(){
    console.log(this.escolherMesas + " escolhidas")
    if(this.escolherMesas.length != 0){
      this.modalExlusao = true;
    }
    else{
      this.fecharModal()
    }
  }
  salvarModal(){
    for(let mesa of this.mesas){
      let cont = 0
      for(; cont < this.escolherMesas.length; cont++){
        if(mesa.numero == this.escolherMesas[cont].numero){
          // rever questão das mesas a se excluir
          this.mesasService.removerMesas(mesa.numero).subscribe(() => this.getMesas());
        };
      };
    };
    this.fecharModal();
  };
  fecharModal(){
    this.escolherMesas = [];
    this.excluirMesas = false;
    this.abrirMensagem = false;
    this.modalExlusao = false;
    this.modalAbrirMesa = false;
    this.modalOcuparMesa = false;
    this.modalAddMesa = false;
  };

}
