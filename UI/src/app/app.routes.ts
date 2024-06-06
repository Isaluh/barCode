import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { MesasComponent } from './views/mesas/mesas.component';
import { CardapioComponent } from './views/cardapio/cardapio.component';
import { ComandaComponent } from './views/comanda/comanda.component';
import { RelatorioComponent } from './views/relatorio/relatorio.component';
import { MenuBarComponent } from './views/menu-bar/menu-bar.component';

export const routes: Routes = [
    {path: "", component: CardapioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'mesas', component: MesasComponent},
    {path: 'comanda', component: ComandaComponent},
    {path: 'relatorio', component: RelatorioComponent}
];

