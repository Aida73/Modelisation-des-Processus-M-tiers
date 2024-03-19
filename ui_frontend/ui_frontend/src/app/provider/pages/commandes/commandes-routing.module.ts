import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from './commandes.component';

const routes: Routes = [
  { path: '', component: CommandesComponent, children:[
    { path: ':id', loadChildren: () => import('./pages/commandes-details/commandes-details.module').then(m => m.CommandesDetailsModule)},
    { path: '', pathMatch:'full', loadChildren: () => import('./pages/commandes-list/commandes-list.module').then(m => m.CommandesListModule) }
  ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule { }
