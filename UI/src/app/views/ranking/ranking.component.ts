import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { NgIf } from '@angular/common';
import { TablesComponent } from '../../components/tables/tables.component';

@Component({
  selector: 'rankingView',
  standalone: true,
  imports: [HeaderComponent, MenuBarComponent, NgIf, TablesComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {

  topicosProduto = ["Produto"]
  topicosData = ["Data"]

  menu = false;
  abrirMenu(){
    this.menu = true;
  }
}
