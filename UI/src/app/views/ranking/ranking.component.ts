import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'rankingView',
  standalone: true,
  imports: [HeaderComponent, MenuBarComponent, NgIf],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  menu = false;
  abrirMenu(){
    this.menu = true;
  }
}
