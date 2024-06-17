import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NgIf } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { TablesComponent } from '../../components/tables/tables.component';
import { ExclusaoComponent } from '../../modals/exclusao/exclusao.component';
import { SemInfoComponent } from '../../modals/sem-info/sem-info.component';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/models';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'usuariosView',
  standalone: true,
  imports: [HeaderComponent, NgIf, MenuBarComponent, InfoBarComponent, TablesComponent, ButtonsComponent, InputsComponent, ExclusaoComponent, SemInfoComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios : Usuario[] = [];
  aMostraUsuarios : Usuario[] = [];
  topicosUsuario = ["Nome", "CPF", ""];
  novaTaxa = -1;
  msgErro : string = "";
  deleteUsuario = 0;
  abrirMensagem = false;

  constructor(private usuariosService : UsuariosService, private localStorageService : LocalStorageService, private router : Router){};

  ngOnInit(): void {
    if(this.localStorageService.getLogin().usuario == null && this.localStorageService.getLogin().senha == null){
      this.router.navigate(["/login"]);
    }
    else if(this.localStorageService.getLogin().acessLevel != 'ADMIN'){
      this.router.navigate([this.localStorageService.getLogin().rota]);
    }
    this.getUsuarios();
    // nome vir com letra maiuscula
  }

  getUsuarios(): void {
    this.usuariosService.getUsuarios()
      .subscribe(usuario => {
        this.usuarios = usuario;
        this.aMostraUsuarios = usuario;
      });
  };

  pegarNome(nome : string){
    if(nome == ""){
      this.getUsuarios();
    }
    else{
      this.aMostraUsuarios = [];
      for(let usuario of this.usuarios){
        if(usuario.nome == nome){
          this.aMostraUsuarios.push(usuario);
        };
      };
    };
  };

  menu = false;
  abrirMenu(){
    this.menu = true;
  };
  fecharMenu(){
    this.menu = false;
  };
  
  modalTaxa = false;
  abrirModalTaxa(){
    this.modalTaxa = true;
  };
  pegarTaxa(numero : number){
    this.novaTaxa = numero;
  };
  mudarTaxa(){
    if(this.novaTaxa < 0){
      this.msgErro = "Valor inválido";
      this.abrirMensagem = true;
      return;
    }
    this.usuariosService.trocarTaxa((this.novaTaxa / 100)).subscribe(() => {});
    this.fecharModal();
  };

  modalCadastrarUsuario = false;
  abrirCadastrarUsuario(){
    this.modalCadastrarUsuario = true;
  };
  cadastrar(cadastro : any){
    // adicionar validador de cpf
    if(cadastro.cpf == "" || cadastro.nome == "" || cadastro.senha == ""){
      this.msgErro = "Campos nulos";
      this.abrirMensagem = true;
      return;
    }
    if(cadastro.cpf.length != 11){
      this.msgErro = "CPF inválido";
      this.abrirMensagem = true;
      return;
    }
    this.usuariosService.cadastro(cadastro).subscribe({
      next: (res) => {
        this.getUsuarios()
        this.fecharModal();
      },
      error: (err) => {
        if(err.status == 500){
          this.msgErro = "CPF já cadastrado";
          this.abrirMensagem = true;
        }
        // erro de cpf invalido
      }
    });
  };

  modalExlusao = false;
  abrirModalExlusao(usuario : number){
    this.deleteUsuario = usuario;
    this.modalExlusao = true;
  };
  salvarModal(){
    let deleteUsuarioFormatado = Number(String(this.deleteUsuario).replaceAll(".", "").replace("-", ""))
    console.log(this.deleteUsuario)
    this.usuariosService.deleteUsuarios(deleteUsuarioFormatado).subscribe({
      next: (data) => {
        let cont = 0;
        for(let usuario of this.usuarios){
          if(usuario.cpf == this.deleteUsuario){
            this.usuarios.splice(cont, 1);
            break;
          };
          cont++;
        };
      }
    });
    this.fecharModal();
  };
  fecharModal(){
    this.abrirMensagem = false;
    this.modalExlusao = false;
    this.modalCadastrarUsuario = false;
    this.modalTaxa = false;
  };
}
