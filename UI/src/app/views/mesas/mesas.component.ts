import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';

@Component({
  selector: 'mesasView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {

}
