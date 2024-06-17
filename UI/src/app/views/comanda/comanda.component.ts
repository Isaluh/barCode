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
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'comandaView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent, InputsComponent, ButtonsComponent, InfoBarSimplesComponent, NgIf, NgFor],
  templateUrl: './comanda.component.html',
  styleUrl: './comanda.component.css'
})
export class ComandaComponent {
  mesas : Mesa[] = [];
  produtosComanda : ProdutoComanda[] = []
  id: number = 0;
  total : number = 0;
  mesaFechada = false;
  pagamento = false;
  msgErro : string = "";
  abrirMensagem : boolean = false
  
  constructor(private localStorageService : LocalStorageService, private router : Router, private mesasService : MesasService, private route: ActivatedRoute, private cardapioService : CardapioService){}

  ngOnInit(): void {
    if(this.localStorageService.getLogin().usuario == null && this.localStorageService.getLogin().senha == null){
      this.router.navigate(["/login"])
    }
    else if(this.localStorageService.getLogin().acessLevel != 'GARCOM'){
      this.router.navigate([this.localStorageService.getLogin().rota])
    }

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
      .subscribe(mesas => {
        this.mesas = mesas.sort((a, b) => a.numero - b.numero)
        for(let mesa of this.mesas){
          if(mesa.numero == this.id){
            if(mesa.statusCode == 2){
              this.mesaFechada = true
              break
            }
          }
        }
      });
  }

  modalPagarMesa = false;
  abrirMetodoPagamento(){
    this.modalPagarMesa = true;
    console.log("abrir modal metodo de pagamento")
  }
  
  modalPagarDinheiro = false;
  pagarDinheiro(){
    this.modalPagarMesa = false;
    this.modalPagarDinheiro = true;
  }

  fecharModal(){
    this.modalPagarMesa = false;
    this.modalPagarDinheiro = false;
    this.abrirMensagem = false;
  }

  podePagar(pagamento : boolean){
    this.pagamento = pagamento;
  }
  
  statusAPagar(metodo : string){
    if(metodo == "dinheiro" && !this.pagamento){
      this.msgErro = "Pagamento não concluido"
      this.abrirMensagem = true;
      return
    }
    this.mesasService.pagarComanda(this.id, metodo).subscribe(
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
