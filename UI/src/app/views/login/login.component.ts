import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../components/header-menu/header-menu.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';

@Component({
  selector: 'loginView',
  standalone: true,
  imports: [HeaderMenuComponent, InputsComponent, ButtonsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  CPF : number = 0;
  senha : string | number = "";

  pegarCPF(cpf : string | number){
    this.CPF = Number(cpf)
  }

  pegarSenha(senha : string | number){
    this.senha = senha
  }

  login(){
    // verificar se cpf e senha batem com o banco de dados usuario
    // criar os erros
    
  }
}
