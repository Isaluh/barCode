import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderMenuComponent } from '../../components/header-menu/header-menu.component';
import { NgIf } from '@angular/common';

// export let menu : boolean = false;

@Component({
  selector: 'menuBarView',
  standalone: true,
  imports: [HeaderMenuComponent, NgIf],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  @Output() voltarTela = new EventEmitter()
  
  fecharMenu(){
    this.voltarTela.emit(false)
  }
}
