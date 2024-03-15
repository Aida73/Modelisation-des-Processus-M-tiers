import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesDetailComponent } from './commandes-detail.component';

const routes: Routes = [{ path: '', component: CommandesDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesDetailRoutingModule { }
