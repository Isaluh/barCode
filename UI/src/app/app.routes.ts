import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './views/login/login.component';
import { MesasComponent } from './views/mesas/mesas.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'mesas', component: MesasComponent},
];

