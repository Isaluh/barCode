import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../components/header-menu/header-menu.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { MensagemComponent } from '../../components/mensagem/mensagem.component';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'loginView',
  standalone: true,
  imports: [NgIf, HeaderMenuComponent, InputsComponent, ButtonsComponent, MensagemComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  CPF : string = "";
  senha : string = "";
  msgErro : string = "";

  constructor(private loginService : LoginService, private localStorageService : LocalStorageService, private router : Router){};

  ngOnInit(){
    if(this.localStorageService.getLogin().usuario != null && this.localStorageService.getLogin().senha != null){
      this.router.navigate([this.localStorageService.getLogin().rota]);
    };
  };

  pegarCPF(cpf : string){
    this.CPF = cpf;
  };

  pegarSenha(senha : string){
    this.senha = senha;
  };

  abrirMensagem = false;
  login(){
    if(this.CPF == "" || this.senha == ""){
      this.msgErro = "Campos nulos.";
      this.abrirMensagem = true;
      return;
    };
    this.abrirMensagem = false;
    this.loginService.verificarLogin(this.CPF, this.senha).subscribe({
      next: (acessLevel) => {
        this.localStorageService.setLogin(this.CPF,  this.senha, acessLevel.acessLevel);
        if(acessLevel.acessLevel == 'ADMIN'){
          this.localStorageService.setRota("/relatorio");
          this.router.navigate(['/relatorio']);
        }
        else if(acessLevel.acessLevel == 'GARCOM'){
          this.localStorageService.setRota("/mesas");
          this.router.navigate(['/mesas']);
        };
      },
      error: (err) => {
        this.msgErro = "Usuário ou senha inválidos.";
        this.abrirMensagem = true;
      }});
  };
}
