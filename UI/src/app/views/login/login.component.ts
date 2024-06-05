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

}
