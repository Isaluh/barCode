import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { InfoBarSimplesComponent } from '../../modals/info-bar-simples/info-bar-simples.component';
import { NgIf } from '@angular/common';
import { MesasService } from '../../../services/mesas.service';
import { Mesa } from '../../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'comandaView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent, InputsComponent, ButtonsComponent, InfoBarSimplesComponent, NgIf],
  templateUrl: './comanda.component.html',
  styleUrl: './comanda.component.css'
})
export class ComandaComponent {
  // pegar numero pela URL
  numeroMesa : number = 0;
  mesas : Mesa[] = [];

  constructor(private router : Router, private mesasService : MesasService){}

  ngOnInit(): void {
    this.getMesas();
  }

  getMesas(): void {
    this.mesasService.getMesas()
      .subscribe(mesas => this.mesas = mesas.sort((a, b) => a.numero - b.numero));
  }

  //incluir taxa do funcionario (ou antes ou dps)
  modalPagarMesa = false;
  abrirMetodoPagamento(){
    this.modalPagarMesa = true;
    console.log("abrir modal metodo de pagamento")
  }
  
  modalPagarDinheiro = false;
  pagarDinheiro(){
    this.modalPagarMesa = false;
    this.modalPagarDinheiro = true;
    console.log("abrir modal dinheiro" + this.modalPagarMesa + " " + this.modalPagarDinheiro)
  }

  fecharModal(){
    this.modalPagarMesa = false;
    this.modalPagarDinheiro = false;
  }

  statusAPagar(){
    // pegar o numero de fato da mesa e passar metodo de pagamento
    this.numeroMesa = 1
    this.mesasService.pagarComanda(this.numeroMesa).subscribe(
      (res) => {
        for(let mesa of this.mesas){
          if(mesa.numero == this.numeroMesa){
            mesa.statusName = 'livre';
            mesa.statusCode = 0;
            break
          };
        };
        this.numeroMesa = 0;
      }
    );
    this.fecharModal()
    this.router.navigate([`/mesas`])
  }

}
