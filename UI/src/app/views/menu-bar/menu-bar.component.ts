import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../components/header-menu/header-menu.component';

@Component({
  selector: 'menuBarView',
  standalone: true,
  imports: [HeaderMenuComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {

}
