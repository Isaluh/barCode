import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FiltroComponent } from '../filtro/filtro.component';

type infoBarVariant = "infoMesas" | "infoMesaCompleto" | "infoMesa" | "filtroDate" | "filtroNome"

@Component({
  selector: 'infoBarComponent',
  standalone: true,
  imports: [NgOptimizedImage, NgIf, FiltroComponent],
  templateUrl: './info-bar.component.html',
  styleUrl: './info-bar.component.css'
})
export class InfoBarComponent {
  @Input() variant : infoBarVariant = "infoMesas";
  @Input() numeroMesa : number = 0;
}
