import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

type headerMenuVariant = "neutro" | "semImg";

@Component({
  selector: 'headerMenuComponent',
  standalone: true,
  imports: [NgOptimizedImage, NgIf],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.css'
})
export class HeaderMenuComponent {
  @Input() variant : headerMenuVariant = "neutro";

  @Output() fecharMenu = new EventEmitter();
  mandarEventoFecharMenu(){
    this.fecharMenu.emit();
  }
}
