import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { NgIf } from '@angular/common';
import { TablesComponent } from '../../components/tables/tables.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'rankingView',
  standalone: true,
  imports: [HeaderComponent, MenuBarComponent, NgIf, TablesComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  topicosProduto = ["Produto", "Quantidade"];
  topicosData = ["Data", "Quantidade"];

  constructor(private localStorageService : LocalStorageService, private router : Router){};

  ngOnInit(){
    if(this.localStorageService.getLogin().usuario == null && this.localStorageService.getLogin().senha == null){
      this.router.navigate(["/login"]);
    }
    else if(this.localStorageService.getLogin().acessLevel != 'ADMIN'){
      this.router.navigate([this.localStorageService.getLogin().rota]);
    };
  };

  // pegar o ranking

  menu = false;
  abrirMenu(){
    this.menu = true;
  };

  fecharMenu(event : boolean){
    this.menu = false;
  };
}
