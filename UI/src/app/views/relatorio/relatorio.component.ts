import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { NgIf } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { TablesComponent } from '../../components/tables/tables.component';

@Component({
  selector: 'relatorioView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent, TablesComponent, InputsComponent, ButtonsComponent, NgIf, MenuBarComponent],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css'
})

export class RelatorioComponent {

  topicosRelatorio = ["N° venda", "Data", "Mesa", "Valor", "Pagamento"];

  menu = false;
  abrirMenu(){
    this.menu = true;
  }

  abrirGerarRelatorio(){
    console.log("abrir modal de gerar relatorio")
  }
}
