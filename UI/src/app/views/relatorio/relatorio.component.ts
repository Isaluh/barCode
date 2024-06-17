import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { InputsComponent } from '../../components/inputs/inputs.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { NgIf } from '@angular/common';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { TablesComponent } from '../../components/tables/tables.component';
import { SemInfoComponent } from '../../modals/sem-info/sem-info.component';
import { LocalStorageService } from '../../../services/localStorage.service';
import { Router } from '@angular/router';
import { Mesa, Produto, RelatorioTabela } from '../../../models/models';
import { ProdutosService } from '../../../services/produtos.service';
import { MesasService } from '../../../services/mesas.service';
import { RelatorioService } from '../../../services/relatorio.service';

@Component({
  selector: 'relatorioView',
  standalone: true,
  imports: [HeaderComponent, InfoBarComponent, TablesComponent, InputsComponent, ButtonsComponent, NgIf, MenuBarComponent, SemInfoComponent],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css'
})

export class RelatorioComponent {
  msgErro : string = "";
  abrirMensagem = false
  produtos : Produto[] = []
  mesas : Mesa[] = []
  vendas : RelatorioTabela[] = []
  aMostraVendas : RelatorioTabela[] = []
  totalVendas : string = ""
  topicosRelatorio = ["N° venda", "Data", "Mesa", "Valor", "Pagamento"];

  constructor(private localStorageService : LocalStorageService, private router : Router, private produtosService : ProdutosService, private mesasService : MesasService, private relatorioService : RelatorioService){}

  ngOnInit(){
    if(this.localStorageService.getLogin().usuario == null && this.localStorageService.getLogin().senha == null){
      this.router.navigate(["/login"])
    }
    else if(this.localStorageService.getLogin().acessLevel != 'ADMIN'){
      this.router.navigate([this.localStorageService.getLogin().rota])
    }

    this.getProdutos()
    this.getMesas();
    this.getVendas()
    this.getVendasAll()
  }

  getProdutos(): void {
    this.produtosService.getProdutosAll()
      .subscribe(produtos => this.produtos = produtos);
  }

  getMesas(): void {
    this.mesasService.getMesas()
    .subscribe(mesas => this.mesas = mesas.sort((a, b) => a.numero - b.numero));
  }

  getVendas(): void {
    this.relatorioService.getVendas()
    .subscribe(vendas => {
      this.aMostraVendas = vendas;
      let total = 0
      for(let venda of vendas){
        total += Number(venda.valor)
      }
      this.totalVendas = total.toFixed(2)
    });
  }

  getVendasAll(): void {
    this.relatorioService.getVendasAll()
    .subscribe(vendas => {
      this.vendas = vendas;
    });
  }

  menu = false;
  abrirMenu(){
    this.menu = true;
  }
  fecharMenu(event : boolean){
    this.menu = event
  }

  pegarFiltro(data : any){
    this.aMostraVendas = []
    if(data.dia == "" && data.mes == "" && data.ano == ""){
      this.getVendas()
      return
    }
    for(let venda of this.vendas){
      let dataVenda = venda.data.split("/")
      if((data.dia == dataVenda[0] || data.dia == "") && (data.mes == dataVenda[1] || data.mes == "") && (data.ano == "20" + dataVenda[2] || data.ano == "")){
        this.aMostraVendas.push(venda)
      }
    }
  }

  modalGerarRelatorio = false
  abrirGerarRelatorio(){
    this.modalGerarRelatorio = true;
    console.log("abrir modal de gerar relatorio")
  }
  gerarRelatorio(relatorio : any){
    if(relatorio.inicio == "" || relatorio.fim == "" || relatorio.value == ""){
      this.msgErro = "Campos nulos"
      this.abrirMensagem = true
      return
    }
    if(relatorio.escolha == "" || relatorio.escolha == "mesa"){
      console.log("passou mesa")
      this.relatorioService.gerarRelatorio(relatorio.inicio, relatorio.fim, relatorio.value.split(" ")[1]).subscribe(() => {})
    }
    else{
      console.log("passou produto")
      this.relatorioService.gerarRelatorio(relatorio.inicio, relatorio.fim, relatorio.value).subscribe(() => {})
    }
    console.log(relatorio)
    this.fecharModals()
  }

  fecharModals(){
    this.modalGerarRelatorio = false;
    this.abrirMensagem = false
  }
}
