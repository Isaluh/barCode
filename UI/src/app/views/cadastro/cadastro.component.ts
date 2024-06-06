import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NgIf } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';

@Component({
  selector: 'cadastroView',
  standalone: true,
  imports: [HeaderComponent, NgIf, MenuBarComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  menu = false;
  abrirMenu(){
    this.menu = true;
  }
}
