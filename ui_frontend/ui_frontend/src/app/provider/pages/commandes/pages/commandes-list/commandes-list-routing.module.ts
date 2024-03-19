import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesListComponent } from './commandes-list.component';

const routes: Routes = [{ path: '', component: CommandesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesListRoutingModule { }
