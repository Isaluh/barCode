import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'checkboxComponent',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  @Output() eventCheckbox = new EventEmitter;

  escolhaRelatorio = [
    {
      escolha : "mesa",
      classe : "selected"
    },
    {
      escolha : "produto",
      classe : ""
    }
  ]

  mesaSelect(){
    for(let item of this.escolhaRelatorio){
      if(item.escolha == 'mesa'){
        item.classe = "selected"
      }
      else{
        item.classe = "";
      }
    }
    this.eventCheckbox.emit('mesa')
  }

  produtoSelect(){
    for(let item of this.escolhaRelatorio){
      if(item.escolha == 'produto'){
        item.classe = "selected"
      }
      else{
        item.classe = "";
      }
    }
    this.eventCheckbox.emit('produto')
  }
}
