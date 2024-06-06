import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'tableRelatorioComponents',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table-relatorio.component.html',
  styleUrl: './table-relatorio.component.css'
})
export class TableRelatorioComponent {
  topicosRelatorio = ["N° venda", "Data", "Mesa", "Valor", "Pagamento"];

}
