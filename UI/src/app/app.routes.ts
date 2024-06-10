import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { MesasComponent } from './views/mesas/mesas.component';
import { CardapioComponent } from './views/cardapio/cardapio.component';
import { ComandaComponent } from './views/comanda/comanda.component';
import { RelatorioComponent } from './views/relatorio/relatorio.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';

export const routes: Routes = [
    {path: '', component: CardapioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'mesas', component: MesasComponent},
    {path: 'cardapio', component: CardapioComponent},
    {path: `comanda/${0}`, component: ComandaComponent},
    {path: 'relatorio', component: RelatorioComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'ranking', component: RankingComponent}
];

