import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MenuBarComponent } from '../../views/menu-bar/menu-bar.component';

type headerVariant = "neutro" | "semPerm" | "visual"

@Component({
  selector: 'headerComponent',
  standalone: true,
  imports: [NgOptimizedImage, NgIf, MenuBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
  })
  
  export class HeaderComponent {
  @Input() variant : headerVariant = "visual";

  @Output() abrirMenu = new EventEmitter();
  mandarEventoAbrirMenu(){
    this.abrirMenu.emit()
  }
}
