import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { MesaComponent } from '../../components/mesa/mesa.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'mesasView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent, MesaComponent, ButtonsComponent, InputsComponent, NgFor],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {

}
