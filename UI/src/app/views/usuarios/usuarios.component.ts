import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NgIf } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { TablesComponent } from '../../components/tables/tables.component';

@Component({
  selector: 'usuariosView',
  standalone: true,
  imports: [HeaderComponent, NgIf, MenuBarComponent, InfoBarComponent, TablesComponent, ButtonsComponent, InputsComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  topicosUsuario = ["Nome", "CPF", "Taxa", "", ""];

  menu = false;
  abrirMenu(){
    this.menu = true;
  }

  abrirCadastrarUsuario(){
    console.log("abrir modal de cadastrar usuario")
  }
}
