import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

type infoBarVariant = "infoMesas" | "infoMesaCompleto" | "infoMesa"

@Component({
  selector: 'infoBarComponent',
  standalone: true,
  imports: [NgIf],
  templateUrl: './info-bar.component.html',
  styleUrl: './info-bar.component.css'
})
export class InfoBarComponent {
  @Input() variant : infoBarVariant = "infoMesas";

}
