import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevisListComponent } from './devis-list.component';

const routes: Routes = [{ path: '', component: DevisListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevisListRoutingModule { }
