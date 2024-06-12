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

@Component({
  selector: 'usuariosView',
  standalone: true,
  imports: [HeaderComponent, NgIf, MenuBarComponent, InfoBarComponent, TablesComponent, ButtonsComponent, InputsComponent, ExclusaoComponent, SemInfoComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios : Usuario[] = [];
  totalUsuarios = this.usuarios.length
  topicosUsuario = ["Nome", "CPF", ""];
  novaTaxa = 0;

  constructor(private usuariosService : UsuariosService){

  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuariosService.getUsuarios()
      .subscribe(usuario => this.usuarios = usuario);
  }

  menu = false;
  abrirMenu(){
    this.menu = true;
  };
  fecharMenu(){
    this.menu = false;
  };
  
  modalTaxa = false;
  abrirModalTaxa(){
    this.modalTaxa = true
  }
  pegarTaxa(numero : number){
    this.novaTaxa = numero;
  }
  mudarTaxa(){
    // mudar taxa de garçom
    console.log(this.novaTaxa)
  }

  modalCadastrarUsuario = false;
  cadastro = [];
  abrirCadastrarUsuario(){
    this.modalCadastrarUsuario = true;
  };
  pegarValoresCadastro(valorInput : any){
    this.cadastro = valorInput;
  }
  cadastrar(){
    this.usuariosService.cadastro(this.cadastro).subscribe((x : any) => {});
    this.cadastro = [];
    this.fecharModal()
  }

  modalExlusao = false;
  abrirModalExlusao(){
    this.modalExlusao = true;
  }
  salvarModal(){
    // fazer a exlusão
    console.log("exclui")
    this.fecharModal()
  }
  fecharModal(){
    this.modalExlusao = false
    this.modalCadastrarUsuario = false;
    this.modalTaxa = false;
  }

}
