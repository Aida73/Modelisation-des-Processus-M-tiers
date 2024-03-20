import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [{ path: '', component: ClientComponent, children:[
  { path: 'commandes', loadChildren: () => import('./pages/commandes/commandes.module').then(m => m.CommandesModule) },
  { path: 'devis', loadChildren: () => import('./pages/devis/devis.module').then(m => m.DevisModule)},
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', redirectTo: 'devis', pathMatch: 'full'}
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
