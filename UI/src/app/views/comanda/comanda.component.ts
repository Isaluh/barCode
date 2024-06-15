import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { InfoBarSimplesComponent } from '../../modals/info-bar-simples/info-bar-simples.component';
import { NgFor, NgIf } from '@angular/common';
import { MesasService } from '../../../services/mesas.service';
import { Mesa, ProdutoComanda } from '../../../models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CardapioService } from '../../../services/cardapio.service';

@Component({
  selector: 'comandaView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent, InputsComponent, ButtonsComponent, InfoBarSimplesComponent, NgIf, NgFor],
  templateUrl: './comanda.component.html',
  styleUrl: './comanda.component.css'
})
export class ComandaComponent {
  // pegar numero pela URL
  mesas : Mesa[] = [];
  produtosComanda : ProdutoComanda[] = []
  id: number = 0;
  total : number = 0;

  constructor(private router : Router, private mesasService : MesasService, private route: ActivatedRoute, private cardapioService : CardapioService){}

  ngOnInit(): void {
    this.getMesas();
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.cardapioService.getComanda(this.id).subscribe(comanda => {
        this.produtosComanda = comanda.produtos;
        this.total = comanda.total
      })
    })
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
    this.mesasService.pagarComanda(this.id).subscribe(
      (res) => {
        for(let mesa of this.mesas){
          if(mesa.numero == this.id){
            mesa.statusName = 'livre';
            mesa.statusCode = 0;
            break
          };
        };
      }
    );
    this.fecharModal()
    this.router.navigate([`/mesas`])
  }

}
