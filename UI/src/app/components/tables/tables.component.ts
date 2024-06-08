import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tablesComponent',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  @Input() topicos :  string[] = [];
}
