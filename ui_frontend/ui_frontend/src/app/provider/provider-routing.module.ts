import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderComponent } from './provider.component';

const routes: Routes = [
  { path: '', component: ProviderComponent, children:[
    { path: 'commandes', loadChildren: () => import('./pages/commandes/commandes.module').then(m => m.CommandesModule) },
    { path: 'commandes-detail', loadChildren: () => import('./pages/commandes-detail/commandes-detail.module').then(m => m.CommandesDetailModule) },
    { path: 'devis', loadChildren: () => import('./pages/devis/devis.module').then(m => m.DevisModule) },
    { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: '', redirectTo: 'commandes', pathMatch: 'full'}
  ]
  } 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
