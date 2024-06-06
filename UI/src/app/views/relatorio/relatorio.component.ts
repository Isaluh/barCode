import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { TableRelatorioComponent } from '../../components/table-relatorio/table-relatorio.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { NgIf } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';

@Component({
  selector: 'relatorioView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent, TableRelatorioComponent, InputsComponent, ButtonsComponent, NgIf, MenuBarComponent],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css'
})

export class RelatorioComponent {
  menu = false;
  abrirMenu(){
    this.menu = true;
  }
}
