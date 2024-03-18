import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesDetailsComponent } from './commandes-details.component';

const routes: Routes = [{ path: '', component: CommandesDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesDetailsRoutingModule { }
