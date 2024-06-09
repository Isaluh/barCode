import { Component, Input } from '@angular/core';

type filtroVariant = "data" | "nome"

@Component({
  selector: 'filtroComponent',
  standalone: true,
  imports: [],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  @Input("placeholder") "placeholder" : string = "";
  @Input() variant : filtroVariant = "data";
}
