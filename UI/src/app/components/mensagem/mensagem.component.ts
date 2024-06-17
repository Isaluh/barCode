import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

type variantMensagem = 'erro' | 'adicionado'

@Component({
  selector: 'mensagemComponent',
  standalone: true,
  imports: [NgIf],
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.css'
})
export class MensagemComponent {
  @Input() mensagem : string = ""
  @Input() variant : variantMensagem = 'erro'
}
