import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { MesasComponent } from './views/mesas/mesas.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'mesas', component: MesasComponent},
];

