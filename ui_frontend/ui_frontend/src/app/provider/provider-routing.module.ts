import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderComponent } from './provider.component';

const routes: Routes = [{ path: '', component: ProviderComponent }, { path: 'commandes', loadChildren: () => import('./pages/commandes/commandes.module').then(m => m.CommandesModule) }, { path: 'commandes-detail', loadChildren: () => import('./pages/commandes-detail/commandes-detail.module').then(m => m.CommandesDetailModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
