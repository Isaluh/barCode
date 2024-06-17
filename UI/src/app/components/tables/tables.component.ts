import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RelatorioTabela, Usuario } from '../../../models/models';

type variantTable = "relatorio" | "usuario" | "ranking"

@Component({
  selector: 'tablesComponent',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  @Input() topicos :  string[] = [];
  @Input() variant : variantTable = "relatorio";
  @Input() conteudoUsuario : Usuario[] = [];
  @Input() conteudoVendas : RelatorioTabela[] = []
  @Output() deleteUsuario = new EventEmitter();

  excluirUsuario(usuario : number){
    this.deleteUsuario.emit(usuario)
  }
}
