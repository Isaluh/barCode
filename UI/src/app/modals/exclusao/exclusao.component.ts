import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonsComponent } from '../../components/buttons/buttons.component';

@Component({
  selector: 'exclusaoModal',
  standalone: true,
  imports: [ButtonsComponent],
  templateUrl: './exclusao.component.html',
  styleUrl: './exclusao.component.css'
})
export class ExclusaoComponent {
  @Input("mgs") "msg" : string = "";
  @Output() calcelarModal = new EventEmitter();
  @Output() salvarModal = new EventEmitter();

  mandarEventoCancelar(){
    this.calcelarModal.emit(false);
  };

  salvarExlusao(){
    this.salvarModal.emit();
  };
}
