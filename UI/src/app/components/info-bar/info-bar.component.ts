import { Component, Input } from '@angular/core';

type infoBarVariant = "infoMesas" | "infoMesaCompleto" | "infoMesa"

@Component({
  selector: 'infoBarComponent',
  standalone: true,
  imports: [],
  templateUrl: './info-bar.component.html',
  styleUrl: './info-bar.component.css'
})
export class InfoBarComponent {
  @Input() variant : infoBarVariant = "infoMesas";

}
